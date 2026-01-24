package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Filedb;

@Repository
public interface FiledbRepository extends JpaRepository<Filedb,Long> {}