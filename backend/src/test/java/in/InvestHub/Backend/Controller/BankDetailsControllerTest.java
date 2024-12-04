package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.BankDetailsController;
import in.InvestHub.Backend.Models.BankDetails;
import in.InvestHub.Backend.Payloads.ApiResponse;
import in.InvestHub.Backend.Services.BankDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = BankDetailsController.class)
class BankDetailsControllerTest {

    public static final String API_BANK_DETAILS = "/api/bankdetails";

    @MockBean
    private BankDetailsService bankDetailsService;

    @Autowired
    private MockMvc mockMvc;

    private BankDetails testBankDetails;

    @BeforeEach
    void setUp() {
        testBankDetails = new BankDetails();
        testBankDetails.setAccNo("1234567890");
        testBankDetails.setIfsc("ABCD12345");
        testBankDetails.setBankname("Test Bank");
        testBankDetails.setBranchname("Test Branch");
    }

    @Test
    void testUpdateAccount() throws Exception {
        String userId = "123";
        Mockito.when(bankDetailsService.updateAccount(any(BankDetails.class), eq(userId))).thenReturn(testBankDetails);

        mockMvc.perform(put(API_BANK_DETAILS + "/{userID}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testBankDetails))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accNo").value(testBankDetails.getAccNo()))
                .andDo(MockMvcResultHandlers.print());

        verify(bankDetailsService).updateAccount(any(BankDetails.class), eq(userId));
    }

    @Test
    void testDeleteAccount() throws Exception {
        String accNo = "1234567890";

        mockMvc.perform(delete(API_BANK_DETAILS + "/{accNo}", accNo))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());

        verify(bankDetailsService).deleteAccount(accNo);
    }

    @Test
    void testGetAllAccounts() throws Exception {
        List<BankDetails> accountList = new ArrayList<>();
        accountList.add(testBankDetails);

        Mockito.when(bankDetailsService.getAllAccounts()).thenReturn(accountList);

        mockMvc.perform(get(API_BANK_DETAILS + "/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].accNo").value(testBankDetails.getAccNo()))
                .andDo(MockMvcResultHandlers.print());

        verify(bankDetailsService).getAllAccounts();
    }

    @Test
    void testGetSingleAccount() throws Exception {
        String accNo = "1234567890";
        Mockito.when(bankDetailsService.getAccountByAccNo(accNo)).thenReturn(testBankDetails);

        mockMvc.perform(get(API_BANK_DETAILS + "/{accNo}", accNo))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.accNo").value(testBankDetails.getAccNo()))
                .andDo(MockMvcResultHandlers.print());

        verify(bankDetailsService).getAccountByAccNo(accNo);
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
