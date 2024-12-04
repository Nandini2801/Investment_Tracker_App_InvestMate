package in.InvestHub.Backend.Repositories;

import in.InvestHub.Backend.Models.Price;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceRepo extends JpaRepository<Price, Long> {
}
