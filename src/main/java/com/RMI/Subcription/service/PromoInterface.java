package com.RMI.Subcription.service;

import com.RMI.Subcription.dto.promoRequestDTO;
import com.RMI.Subcription.models.Promo_code;
import com.RMI.Subcription.types.PromoStatus;

import java.util.*;

public interface PromoInterface {
    List<Promo_code> savePromocode(List<promoRequestDTO> list);
    Promo_code createPromoCode(promoRequestDTO code);
    List<Promo_code> findAll();
    String markAsExpired(UUID id);
    String markAsUsed(UUID id);
    String markAsActived(UUID id);
}
