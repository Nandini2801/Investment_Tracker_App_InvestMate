package in.InvestHub.Backend.Repositories;

import in.InvestHub.Backend.Models.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankDetailsRepo extends JpaRepository<BankDetails, Long> {
//  User findByUser(String userId);

}
