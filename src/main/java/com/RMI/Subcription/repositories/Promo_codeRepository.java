package com.RMI.Subcription.repositories;


import org.springframework.data.cassandra.repository.CassandraRepository;

import com.RMI.Subcription.models.Promo_code;

import java.util.UUID;

public interface Promo_codeRepository extends CassandraRepository<Promo_code, UUID>  {

}
