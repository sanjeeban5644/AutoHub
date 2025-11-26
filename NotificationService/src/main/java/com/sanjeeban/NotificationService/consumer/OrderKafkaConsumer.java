package com.sanjeeban.NotificationService.consumer;


import com.sanjeeban.OrderService.event.OrderEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderKafkaConsumer {

    @KafkaListener(topics="order-random-topic")
    public  void handleOrderRandomTopic(String message){
        System.out.println("------Message received------>>>"+message);
    }


    @KafkaListener(topics="order-event-topic")
    public  void handleOrderEventTopic(OrderEvent orderEvent){
        System.out.println("------Message received------>>>"+orderEvent.getOrderStatus());
        System.out.println("------Message received------>>>"+orderEvent.toString());

    }





}
