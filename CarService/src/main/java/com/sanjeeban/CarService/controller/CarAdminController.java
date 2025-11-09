package com.sanjeeban.CarService.controller;

import com.sanjeeban.CarService.dto.CarDto;
import com.sanjeeban.CarService.dto.CarResponseForOrders;
import com.sanjeeban.CarService.dto.SaveCarResponse;
import com.sanjeeban.CarService.service.CarAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.PutExchange;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/car")
public class CarAdminController {

    private CarAdminService carAdminService;

    @Autowired
    public  CarAdminController(CarAdminService carAdminService){
        this.carAdminService = carAdminService;
    }


    @PostMapping(path="/saveCar",consumes = "application/json",produces = "application/json")
    public ResponseEntity<SaveCarResponse> saveCar(@RequestBody CarDto request){
        SaveCarResponse response = new SaveCarResponse();
        try{
            response = carAdminService.saveNewCar(request);
        }catch (Exception e){
            response.setRemarks("Unable to save the car");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(response);
    }


    @GetMapping(path="/getCarsWithBrandAndModel")
    public ResponseEntity<List<SaveCarResponse>> getAllCars(@RequestParam String brand,@RequestParam String model){

            List<SaveCarResponse> response = carAdminService.getCarsBasedOnBrandAndModel(brand,model);
            return ResponseEntity.ok(response);
    }


    @GetMapping(path="/checkStock")
    public ResponseEntity<Integer> checkStock(@RequestParam Long carId){
        Integer stock = carAdminService.getCurrentCarStock(carId);
        return ResponseEntity.ok(stock);
    }


    @GetMapping(path="/getCarById")
    public ResponseEntity<CarResponseForOrders> getCarById(@RequestParam Long carId){
        CarResponseForOrders response = carAdminService.getCarByCarId(carId);
        return ResponseEntity.ok(response);
    }


    @PutMapping(path="/updateCar")
    public ResponseEntity<CarResponseForOrders> updateStock(@RequestParam Long carId,@RequestParam Integer quantity){
        CarResponseForOrders response = carAdminService.updateStock(carId,quantity);
        return ResponseEntity.ok(response);
    }


}
