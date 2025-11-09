package com.sanjeeban.CarService.customException;

public class NotEnoughStockException extends RuntimeException{
    public NotEnoughStockException(String msg){
        super(msg);
    }
}
