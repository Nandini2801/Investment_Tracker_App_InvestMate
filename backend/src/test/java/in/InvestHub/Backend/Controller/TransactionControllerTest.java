package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.TransactionController;
import in.InvestHub.Backend.Models.Transaction;
import in.InvestHub.Backend.Services.TransactionService;
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

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = TransactionController.class)
class TransactionControllerTest {

    public static final String API_TRANSACTIONS = "/api/transactions";

    @MockBean
    private TransactionService transactionService;

    @Autowired
    private MockMvc mockMvc;

    private Transaction testTransaction;

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @BeforeEach
    void setUp() {
        testTransaction = new Transaction();
        testTransaction.setId(1L);
        testTransaction.setStockId(1L);
        testTransaction.setStockName("Test Stock");
        testTransaction.setAction("BUY");
        testTransaction.setQuantity(10);
        testTransaction.setDate(Date.valueOf("2023-01-01"));
    }

    @Test
    void testGetTransactionById() throws Exception {
        Long transactionId = 1L;
        Mockito.when(transactionService.findById(transactionId)).thenReturn(testTransaction);

        mockMvc.perform(get(API_TRANSACTIONS + "/{id}", transactionId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(testTransaction.getId()))
                .andExpect(jsonPath("$.stockName").value(testTransaction.getStockName()))
                .andDo(MockMvcResultHandlers.print());

        verify(transactionService).findById(transactionId);
    }

    @Test
    void testGetTransactionByIdNotFound() throws Exception {
        Long transactionId = 2L;
        Mockito.when(transactionService.findById(transactionId)).thenReturn(null);

        mockMvc.perform(get(API_TRANSACTIONS + "/{id}", transactionId))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());

        verify(transactionService).findById(transactionId);
    }

    @Test
    void testGetAllTransactions() throws Exception {
        List<Transaction> transactionList = new ArrayList<>();
        transactionList.add(testTransaction);

        Mockito.when(transactionService.getTransactionsWithStockInfo()).thenReturn(transactionList);

        mockMvc.perform(get(API_TRANSACTIONS + "/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(testTransaction.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(transactionService).getTransactionsWithStockInfo();
    }

    @Test
    void testCreateTransaction() throws Exception {
        Mockito.when(transactionService.save(any(Transaction.class))).thenReturn(testTransaction);

        mockMvc.perform(post(API_TRANSACTIONS + "/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testTransaction))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testTransaction.getId()))
                .andDo(MockMvcResultHandlers.print());

        verify(transactionService).save(any(Transaction.class));
    }

    @Test
    void testDeleteTransaction() throws Exception {
        Long transactionId = 1L;

        mockMvc.perform(delete(API_TRANSACTIONS + "/{id}", transactionId))
                .andExpect(status().isNoContent())
                .andDo(MockMvcResultHandlers.print());

        verify(transactionService).delete(transactionId);
    }


}
