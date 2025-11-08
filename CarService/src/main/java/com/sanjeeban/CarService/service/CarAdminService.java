package com.sanjeeban.CarService.service;


import com.netflix.discovery.converters.Auto;
import com.sanjeeban.CarService.controller.CarAdminController;
import com.sanjeeban.CarService.customException.CarNotFoundException;
import com.sanjeeban.CarService.dto.CarDto;
import com.sanjeeban.CarService.dto.SaveCarResponse;
import com.sanjeeban.CarService.entitiy.Cars;
import com.sanjeeban.CarService.repository.CarRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarAdminService {

    private ModelMapper modelMapper;
    private CarRepository carRepository;

    @Autowired
    public CarAdminService(ModelMapper modelMapper,CarRepository carRepository){
        this.modelMapper = modelMapper;
        this.carRepository = carRepository;
    }



    public SaveCarResponse saveNewCar(CarDto request) {
        SaveCarResponse response = new SaveCarResponse();

        Cars carEntity = new Cars();

        try{
            carEntity = modelMapper.map(request,Cars.class);

            carEntity.setCreatedAt(LocalDateTime.now());
            carEntity.setUpdatedAt(LocalDateTime.now());

            carRepository.save(carEntity);

            response = modelMapper.map(carEntity,SaveCarResponse.class);

            response.setRemarks("Car Save Successfully");

        }catch (Exception e){
            e.printStackTrace();
            response.setRemarks("Error in Saving Car Details");
        }

        return response;
    }

    public List<SaveCarResponse> getCarsBasedOnBrandAndModel(String brand, String model) {

        List<SaveCarResponse> response = new ArrayList<>();

        List<Cars> listOfCars = carRepository.listOfCars(brand,model).get();
        if(!listOfCars.isEmpty()){
            response = listOfCars.stream()
                    .map(car -> modelMapper.map(car,SaveCarResponse.class))
                    .collect(Collectors.toList());
        }else {
            throw new CarNotFoundException("Car not found with brand : "+brand+" and model : "+model);
        }

        return response;

    }
}
