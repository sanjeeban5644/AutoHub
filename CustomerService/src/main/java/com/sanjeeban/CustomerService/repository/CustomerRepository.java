package com.sanjeeban.CustomerService.repository;

import com.sanjeeban.CustomerService.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customers,Long> {

    @Query("SELECT T FROM Customers T WHERE T.email = :email")
    public Optional<Customers> getCustomerByEmail(@Param("email") String email);

    @Query("SELECT T FROM Customers T WHERE T.customerId = :customerId")
    public Optional<Customers> getCustomerById(@Param("customerId") Long customerId);


}
