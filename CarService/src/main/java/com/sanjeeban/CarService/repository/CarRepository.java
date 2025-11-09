package com.sanjeeban.CarService.repository;

import com.sanjeeban.CarService.entitiy.Cars;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Cars,Long> {


    @Query("SELECT T FROM Cars T WHERE LOWER(T.brand) like LOWER(CONCAT('%', :brand, '%')) AND LOWER(T.model) like LOWER(CONCAT('%', :model, '%'))")
    public Optional<List<Cars>> listOfCars(@Param("brand") String brand, @Param("model") String model);


    @Query("SELECT T.stockQuantity FROM Cars T WHERE T.carId = :carId")
    public Optional<Integer> getCurrentStockByCarId(@Param("carId") Long carId);

    @Query("SELECT T FROM Cars T WHERE T.carId = :carId")
    public Optional<Cars> getCarByCarId(@Param("carId") Long carId);


}
