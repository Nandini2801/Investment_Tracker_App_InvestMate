package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.BankDetails;
import in.InvestHub.Backend.Models.User;
import in.InvestHub.Backend.Repositories.BankDetailsRepo;
import in.InvestHub.Backend.Repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BankDetailsServiceImpl implements BankDetailsService {

  @Autowired
  private BankDetailsRepo bankDetailsRepo;

  @Autowired
  private UserRepo userRepo;

  @Override
  public BankDetails createAccount(BankDetails bankDetails) {
    return this.bankDetailsRepo.save(bankDetails);
  }

  @Override
  public BankDetails updateAccount(BankDetails bankDetails, String accNo) {
    BankDetails bankUpdate = this.bankDetailsRepo.findById(Long.valueOf(accNo)).orElseThrow(() -> new ResourceNotFoundException("Account", "userId", accNo));
    bankUpdate.setAccNo(bankDetails.getAccNo());
    bankUpdate.setIfsc(bankDetails.getIfsc());
    bankUpdate.setBranchname(bankDetails.getBranchname());
    bankUpdate.setBankname(bankDetails.getBankname());
    return this.bankDetailsRepo.save(bankUpdate);
  }

  @Override
  public BankDetails getAccountByAccNo(String accNo) {
    return this.bankDetailsRepo.findById(Long.valueOf(accNo)).orElseThrow(() -> new ResourceNotFoundException("Account", "accNo", accNo));
  }

  @Override
  public List<BankDetails> getAllAccounts() {
    return this.bankDetailsRepo.findAll();
  }

  @Override
  public void deleteAccount(String accNo) {
    BankDetails bankDetails = this.bankDetailsRepo.findById(Long.valueOf(accNo)).orElseThrow(() -> new ResourceNotFoundException("Account", "accNo", accNo));
    this.bankDetailsRepo.delete(bankDetails);
  }


  @Override
  public BankDetails register(BankDetails bankDetails, Long userId) {
    Optional<User> user = userRepo.findById(userId);
    if (user.isPresent()) {
      BankDetails bd = new BankDetails();
      bd.setUser(user.get());
      bd.setAccNo(bankDetails.getAccNo());
      bd.setBranchname(bankDetails.getBranchname());
      bd.setBankname(bankDetails.getBankname());
      bd.setIfsc(bankDetails.getIfsc());
      return bankDetailsRepo.save(bd);
    }
    throw new RuntimeException("Error");

  }
}
