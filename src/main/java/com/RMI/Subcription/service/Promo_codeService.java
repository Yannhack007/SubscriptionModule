package com.RMI.Subcription.service;

import java.util.*;

import com.RMI.Subcription.dto.promoRequestDTO;
import com.RMI.Subcription.types.PromoStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.RMI.Subcription.models.Promo_code;
import com.RMI.Subcription.repositories.Promo_codeRepository;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Service
public class Promo_codeService {
    @Autowired
    private Promo_codeRepository promo;

    private PromoStatus validateStatus(String status) {
        try {
            return (status != null) ? PromoStatus.valueOf(status.toUpperCase()) : PromoStatus.ACTIVE;
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid Status : " + status + ". Accepted Values : "
                    + Arrays.toString(PromoStatus.values()));
        }
    }


    public List<Promo_code> savePromocode(List<promoRequestDTO> list) {
        List<Promo_code> promoList = new ArrayList<>();
        for (promoRequestDTO code : list) {
            Promo_code po = new Promo_code(code);
            po.setId(UUID.randomUUID());
            po.setStatus(validateStatus(String.valueOf(code.getStatus())).name());
            promo.save(po);
            promoList.add(po);
        }
        return promoList;
    }

    public Promo_code createPromoCode(promoRequestDTO code) {
        Promo_code po = new Promo_code(code);
        po.setId(UUID.randomUUID());
        po.setStatus(validateStatus(String.valueOf(code.getStatus())).name());
        return promo.save(po);
    }

    public List<Promo_code> findAll() {
        return promo.findAll();
    }
    public String disablePromo(UUID id) {
        Promo_code promoCode = promo.findById(id).orElse(null);
        if (promoCode == null) {
            return "Promo code not found";
        }
        promoCode.setStatus(PromoStatus.DISABLED.name());
        promo.save(promoCode);
        return "Promo code disabled successfully";
    }

    public String markAsExpired(UUID id) {
        Optional<Promo_code> optionalPromo = promo.findById(id);
        if (optionalPromo.isPresent()) {
            Promo_code promoCode = optionalPromo.get();
            promoCode.setStatus(PromoStatus.EXPIRED.name()); // Stocké sous forme de String
            promo.save(promoCode);
            return "The promo code " + promoCode.getCode() + " is now expired.";
        }
        return "Promo code not found.";
    }

    public String markAsUsed(UUID id) {
        Optional<Promo_code> optionalPromo = promo.findById(id);
        if (optionalPromo.isPresent()) {
            Promo_code promoCode = optionalPromo.get();
            promoCode.setStatus(PromoStatus.USED.name()); // Stocké sous forme de String
            promo.save(promoCode);
            return "The promo code " + promoCode.getCode() + " is now used.";
        }
        return "Promo code not found.";
    }

    public String markAsActived(UUID id) {
        Optional<Promo_code> optionalPromo = promo.findById(id);
        if (optionalPromo.isPresent()) {
            Promo_code promoCode = optionalPromo.get();
            promoCode.setStatus(PromoStatus.ACTIVE.name()); // Stocké sous forme de String
            promo.save(promoCode);
            return "The promo code " + promoCode.getCode() + " is now actived.";
        }
        return "Promo code not found.";
    }
}
