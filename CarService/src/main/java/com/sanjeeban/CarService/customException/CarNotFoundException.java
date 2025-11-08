package com.sanjeeban.CarService.customException;

public class CarNotFoundException extends RuntimeException{

    public CarNotFoundException(String msg){
        super(msg);
    }



}
