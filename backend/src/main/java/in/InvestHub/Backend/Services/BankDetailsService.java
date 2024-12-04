package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.BankDetails;

import java.util.List;

public interface BankDetailsService {
  BankDetails createAccount(BankDetails bankDetails);

  BankDetails updateAccount(BankDetails bankDetails, String accNo);

  BankDetails getAccountByAccNo(String accNo);

  List<BankDetails> getAllAccounts();

  void deleteAccount(String accNo);
  
  BankDetails register(BankDetails bd, Long userId);

}
