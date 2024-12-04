package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.BankDetails;
import in.InvestHub.Backend.Repositories.BankDetailsRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BankDetailsServiceImplTest {

    @Mock
    private BankDetailsRepo bankDetailsRepo;

    @InjectMocks
    private BankDetailsServiceImpl bankDetailsService;

    private BankDetails sampleBankDetails;

    @BeforeEach
    public void setUp() {
        sampleBankDetails = new BankDetails();
        sampleBankDetails.setAccNo("1234567890");
        sampleBankDetails.setIfsc("ABCD12345");
        sampleBankDetails.setBankname("Test Bank");
        sampleBankDetails.setBranchname("Test Branch");
    }

    @Test
    public void testCreateAccount() {
        when(bankDetailsRepo.save(any(BankDetails.class))).thenReturn(sampleBankDetails);

        BankDetails createdAccount = bankDetailsService.createAccount(sampleBankDetails);

        assertNotNull(createdAccount);
        assertEquals(sampleBankDetails, createdAccount);

        verify(bankDetailsRepo, times(1)).save(sampleBankDetails);
    }

    @Test
    public void testUpdateAccount() {
        String userId = "12345";
        BankDetails updatedAccount = new BankDetails();
        updatedAccount.setBranchname("Updated Branch");

        when(bankDetailsRepo.findById(Long.valueOf(userId))).thenReturn(Optional.of(sampleBankDetails));
        when(bankDetailsRepo.save(sampleBankDetails)).thenReturn(updatedAccount);

        BankDetails result = bankDetailsService.updateAccount(updatedAccount, userId);

        assertNotNull(result);
        assertEquals("Updated Branch", result.getBranchname());

        verify(bankDetailsRepo, times(1)).findById(Long.valueOf(userId));
        verify(bankDetailsRepo, times(1)).save(sampleBankDetails);
    }

    @Test
    public void testGetAccountByAccNo() {
        String accNo = sampleBankDetails.getAccNo();
        when(bankDetailsRepo.findById(Long.valueOf(accNo))).thenReturn(Optional.of(sampleBankDetails));

        BankDetails result = bankDetailsService.getAccountByAccNo(accNo);

        assertNotNull(result);
        assertEquals(sampleBankDetails, result);

        verify(bankDetailsRepo, times(1)).findById(Long.valueOf(accNo));
    }

    @Test
    public void testGetAccountByAccNoNotFound() {
        String accNo = "9876543210";
        when(bankDetailsRepo.findById(Long.valueOf(accNo))).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bankDetailsService.getAccountByAccNo(accNo));

        verify(bankDetailsRepo, times(1)).findById(Long.valueOf(accNo));
    }

    @Test
    public void testGetAllAccounts() {
        List<BankDetails> accountList = new ArrayList<>();
        accountList.add(sampleBankDetails);
        when(bankDetailsRepo.findAll()).thenReturn(accountList);

        List<BankDetails> result = bankDetailsService.getAllAccounts();

        assertNotNull(result);
        assertEquals(accountList, result);

        verify(bankDetailsRepo, times(1)).findAll();
    }

    @Test
    public void testDeleteAccount() {
        String accNo = sampleBankDetails.getAccNo();

        when(bankDetailsRepo.findById(Long.valueOf(accNo))).thenReturn(Optional.of(sampleBankDetails));

        bankDetailsService.deleteAccount(accNo);

        verify(bankDetailsRepo, times(1)).findById(Long.valueOf(accNo));
        verify(bankDetailsRepo, times(1)).delete(sampleBankDetails);
    }

    @Test
    public void testDeleteAccountNotFound() {
        String accNo = "9876543210";
        when(bankDetailsRepo.findById(Long.valueOf(accNo))).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bankDetailsService.deleteAccount(accNo));

        verify(bankDetailsRepo, times(1)).findById(Long.valueOf(accNo));
        verify(bankDetailsRepo, never()).delete(any());
    }
}
