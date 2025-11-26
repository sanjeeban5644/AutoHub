package com.sanjeeban.OrderService.config;


import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaTopicConfig {


    @Value("${kafka.topic.order-random-topic}")
    private String KAFKA_RANDOM_ORDER_TOPIC;

    @Value("${kafka.topic.order-event-topic}")
    private String KAFKA_ORDER_EVENT_TOPIC;


    public NewTopic orderRandomTopic(){
        return new NewTopic(KAFKA_RANDOM_ORDER_TOPIC,2,(short)1);
    }

    public NewTopic orderEventTopic(){
        return new NewTopic(KAFKA_ORDER_EVENT_TOPIC,2,(short)1);
    }

}
