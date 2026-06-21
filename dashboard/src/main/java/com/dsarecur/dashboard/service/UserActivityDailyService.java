package com.dsarecur.dashboard.service;

import com.dsarecur.dashboard.Repository.UserActivityDailyRepo;
import com.dsarecur.dashboard.Repository.UserEntityActivityRepo;
import com.dsarecur.dashboard.dto.LeastRevisedQuestionDto;
import com.dsarecur.dashboard.dto.MostRevisedQuestionDto;
import com.dsarecur.dashboard.dto.SummaryDto;
import com.dsarecur.dashboard.dto.WeakTopicDto;
import com.dsarecur.dashboard.kafka.DashboardEvent;
import com.dsarecur.dashboard.model.UserActivityDaily;
import com.dsarecur.dashboard.model.UserEntityActivity;
import org.springframework.beans.factory.annotation.Autowired;
import com.dsarecur.dashboard.constants.EntityType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserActivityDailyService {

    @Autowired
    private UserActivityDailyRepo userActivityDailyRepo;

    @Autowired
    private UserEntityActivityRepo  userEntityActivityRepo;

    public SummaryDto getSummary() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        String userEmail = authentication.getName();

        List<UserActivityDaily> userActivityDailyInfo = userActivityDailyRepo.findAll();
        List<UserEntityActivity> userEntityActivityInfo = userEntityActivityRepo.findAll();

        SummaryDto summaryDto = new SummaryDto();

        // ADD USERID FILTER IN EVERY QUERY

        // 1. questionVisits: from "UserEntityActivity" filter by entityType === 'QUESTION' and sum of "visitCount"
        int questionsRevised = userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity ->
                        activity.getEntityType() == EntityType.QUESTION)
                .mapToInt(UserEntityActivity::getVisitCount)
                .sum();

        summaryDto.setQuestionsRevised(questionsRevised);

        // 2. totalRevisions: from "UserEntityActivity" sum of all "visitCount"
        int totalRevisions = userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .mapToInt(UserEntityActivity::getVisitCount)
                .sum();
        summaryDto.setTotalRevisions(totalRevisions);
        System.out.println("userEmail: " + userEmail);

        // 3. topicsCovered: from "UserEntityActivity" count of unique topics(entityType)
        int topicsCovered = (int) userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity ->
                        activity.getEntityType() == EntityType.TOPIC)
                .map(UserEntityActivity::getEntityId)
                .distinct()
                .count();
        summaryDto.setTopicsCovered(topicsCovered);


        // 4. notesRevised: from "UserEntityActivity" filter by entityType === 'NOTES' and sum of "visitCount"
        int notesRevised = (int) userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity ->
                        activity.getEntityType() == EntityType.NOTE)
                .map(UserEntityActivity::getEntityId)
                .distinct()
                .count();
        summaryDto.setNotesRevised(notesRevised);

        // 5. theoriesRevised: from "UserEntityActivity" filter by entityType === 'THEORY' and sum of "visitCount"

        int theoriesRevised = (int) userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity ->
                        activity.getEntityType() == EntityType.THEORY)
                .map(UserEntityActivity::getEntityId)
                .distinct()
                .count();
        summaryDto.setNotesRevised(theoriesRevised);


        // 6. currentStreak: in "UserActivityDaily" start from date today, and go back till continiously the userid
        //                  present
        int currentStreak = 0;
        LocalDate today = LocalDate.now();

        // Get all activity dates of current user
        Set<LocalDate> activityDates = userActivityDailyInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .map(UserActivityDaily::getDate)
                .collect(Collectors.toSet());

        // Start from today and go backwards
        while (activityDates.contains(today)) {
            currentStreak++;
            today = today.minusDays(1);
        }
        summaryDto.setCurrentStreak(currentStreak);

        // 7. todayRevisionCount: in "UserActivityDaily" check for date today and get the users "total_visits"
        int todayRevisionCount = userActivityDailyInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity -> activity.getDate().equals(LocalDate.now()))
                .mapToInt(UserActivityDaily::getTotalVisits)
                .sum();
        summaryDto.setTodayRevisionCount(todayRevisionCount);

        // 8. mostRevisedTopic: from "UserEntityActivity" filter all by "entity_type == 'TOPIC'" then get the topic
        //                   with most "visit_count"
        Integer mostRevisedTopic = userEntityActivityInfo.stream()
                .filter(activity -> activity.getUserId().equals(userEmail))
                .filter(activity ->
                        activity.getEntityType() == EntityType.TOPIC)
                .max(Comparator.comparingInt(UserEntityActivity::getVisitCount))
                .map(UserEntityActivity::getEntityId)
                .orElse(null);
        summaryDto.setMostRevisedTopic(mostRevisedTopic);

        return summaryDto;
    }

    // getWeakTopics
    /*
        A topic is considered weak if:
        - Its last visited is 15 or more days ago.
    */
    public List<WeakTopicDto> getWeakTopics() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;

        String userEmail = authentication.getName();

        // Topics not visited in last 15 days
        LocalDateTime fifteenDaysAgo =
                LocalDateTime.now().minusDays(15);

        List<UserEntityActivity> userEntityActivityInfo =
                userEntityActivityRepo.findAll();

        return userEntityActivityInfo.stream()

                // Current user
                .filter(activity ->
                        activity.getUserId().equals(userEmail))

                // Only TOPIC entities
                .filter(activity ->
                        activity.getEntityType()
                                == EntityType.TOPIC)

                // Weak topic criteria
                .filter(activity ->
                        activity.getLastVisitedAt()
                                .isBefore(fifteenDaysAgo))

                // Convert entity -> DTO
                .map(activity -> {

                    WeakTopicDto dto = new WeakTopicDto();

                    dto.setTopicId(activity.getEntityId());
                    dto.setLastVisited(activity.getLastVisitedAt());

                    return dto;
                })

                .toList();
    }

    // getMostRevisedQuestions
    public List<MostRevisedQuestionDto> getMostRevisedQuestions() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;

        String userEmail = authentication.getName();

        List<UserEntityActivity> userEntityActivityInfo =
                userEntityActivityRepo.findAll();

        return userEntityActivityInfo.stream()

                // Current user filter
                .filter(activity ->
                        activity.getUserId().equals(userEmail))

                // Only QUESTION type
                .filter(activity ->
                        activity.getEntityType()
                                == EntityType.QUESTION)

                // Sort descending by revisionCount
                .sorted((a, b) ->
                        Integer.compare(
                                b.getVisitCount(),
                                a.getVisitCount()))
                .limit(5)
                // Convert to DTO
                .map(activity -> {

                    MostRevisedQuestionDto dto =
                            new MostRevisedQuestionDto();

                    dto.setQuestionId(activity.getEntityId());
                    dto.setRevisionCount(activity.getVisitCount());

                    return dto;
                })

                .toList();
    }

    // getLeastVisitedQuestions
    public List<LeastRevisedQuestionDto> getLeastRevisedQuestions() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;

        String userEmail = authentication.getName();

        List<UserEntityActivity> userEntityActivityInfo =
                userEntityActivityRepo.findAll();

        return userEntityActivityInfo.stream()

                // Current user filter
                .filter(activity ->
                        activity.getUserId().equals(userEmail))

                // Only QUESTION type
                .filter(activity ->
                        activity.getEntityType()
                                == EntityType.QUESTION)

                // Sort ascending by revisionCount
                .sorted(Comparator.comparingInt(
                        UserEntityActivity::getVisitCount))

                .limit(5)
                // Convert to DTO
                .map(activity -> {

                    LeastRevisedQuestionDto dto =
                            new LeastRevisedQuestionDto();

                    dto.setQuestionId(activity.getEntityId());
                    dto.setRevisionCount(activity.getVisitCount());

                    return dto;
                })

                .toList();
    }

    // getActivityOverTime
    public Integer getActivity() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assert authentication != null;

        String userEmail = authentication.getName();

        List<UserActivityDaily> userActivityDailyInfo =
                userActivityDailyRepo.findAll();

        return userActivityDailyInfo.stream()

                // Current user filter
                .filter(activity ->
                        activity.getUserId().equals(userEmail))

                // Today's activity only
                .filter(activity ->
                        activity.getDate().equals(LocalDate.now()))

                // Get total visits
                .mapToInt(UserActivityDaily::getTotalVisits)

                // Sum total visits
                .sum();
    }

    public void processEvent(DashboardEvent event) {
        System.out.println("coming");
        String userId = event.getUserId().toString();
        LocalDate today = LocalDate.now();

        UserActivityDaily activity =
                userActivityDailyRepo
                        .findByUserIdAndDate(userId, today)
                        .orElseGet(() -> {

                            UserActivityDaily newActivity =
                                    new UserActivityDaily();

                            newActivity.setUserId(userId);
                            newActivity.setDate(today);
                            newActivity.setTotalVisits(0);
                            newActivity.setTopicVisits(0);
                            newActivity.setQuestionVisits(0);
                            newActivity.setTheoryVisits(0);
                            newActivity.setNotesVisits(0);
                            newActivity.setCreatedAt(LocalDateTime.now());
                            newActivity.setUpdatedAt(LocalDateTime.now());

                            return newActivity;
                        });

        activity.setTotalVisits(
                activity.getTotalVisits() + 1
        );

        switch (event.getEntityType()) {

            case TOPIC ->
                    activity.setTopicVisits(
                            activity.getTopicVisits() + 1);

            case QUESTION ->
                    activity.setQuestionVisits(
                            activity.getQuestionVisits() + 1);

            case THEORY ->
                    activity.setTheoryVisits(
                            activity.getTheoryVisits() + 1);

            case NOTE ->
                    activity.setNotesVisits(
                            activity.getNotesVisits() + 1);
        }

        activity.setUpdatedAt(LocalDateTime.now());
        System.out.println("📊 UserActivityDaily => userId=" + activity.getUserId()
                + ", date=" + activity.getDate()
                + ", totalVisits=" + activity.getTotalVisits()
                + ", topicVisits=" + activity.getTopicVisits()
                + ", questionVisits=" + activity.getQuestionVisits()
                + ", theoryVisits=" + activity.getTheoryVisits()
                + ", notesVisits=" + activity.getNotesVisits()
                + ", updatedAt=" + activity.getUpdatedAt());

        userActivityDailyRepo.save(activity);

        UserEntityActivity entityActivity =
                userEntityActivityRepo
                        .findByUserIdAndEntityIdAndEntityType(
                                userId,
                                event.getEntityId(),
                                event.getEntityType()
                        )
                        .orElseGet(() -> {

                            UserEntityActivity newActivity =
                                    new UserEntityActivity();

                            newActivity.setUserId(userId);
                            newActivity.setEntityId(event.getEntityId());
                            newActivity.setEntityType(event.getEntityType());

                            newActivity.setVisitCount(0);

                            newActivity.setLastVisitedAt(LocalDateTime.now());
                            newActivity.setCreatedAt(LocalDateTime.now());
                            newActivity.setUpdatedAt(LocalDateTime.now());

                            return newActivity;
                        });

        // increment visits
        entityActivity.setVisitCount(entityActivity.getVisitCount() + 1);

        // update timestamps
        entityActivity.setLastVisitedAt(LocalDateTime.now());
        entityActivity.setUpdatedAt(LocalDateTime.now());

        userEntityActivityRepo.save(entityActivity);
    }
}
