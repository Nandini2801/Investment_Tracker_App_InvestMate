package in.InvestHub.Backend.Services;


import in.InvestHub.Backend.Exception.ResourceNotFoundException;
import in.InvestHub.Backend.Models.Transaction;
import in.InvestHub.Backend.Repositories.TransactionRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class TransactionServiceImplTest {

    @Mock
    private TransactionRepo transactionRepo;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    private Transaction sampleTransaction;

    @BeforeEach
    public void setUp() {
        sampleTransaction = new Transaction();
        sampleTransaction.setId(1L);
        sampleTransaction.setStockId(2L);
        sampleTransaction.setStockName("Sample Stock");
        sampleTransaction.setAction("Buy");
        sampleTransaction.setQuantity(10);
        sampleTransaction.setDate(new Date(System.currentTimeMillis()));
    }

    @Test
    public void testFindById() {
        // Arrange
        Long transactionId = 1L;
        when(transactionRepo.findById(transactionId)).thenReturn(Optional.of(sampleTransaction));

        // Act
        Transaction result = transactionService.findById(transactionId);

        // Assert
        assertNotNull(result);
        assertEquals(sampleTransaction, result);
    }

    @Test
    public void testFindAll() {
        // Arrange
        List<Transaction> expectedTransactions = new ArrayList<>();
        expectedTransactions.add(sampleTransaction);
        when(transactionRepo.findAll()).thenReturn(expectedTransactions);

        // Act
        List<Transaction> result = transactionService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(expectedTransactions, result);
    }

    @Test
    public void testSave() {
        // Arrange
        when(transactionRepo.save(any(Transaction.class))).thenReturn(sampleTransaction);

        // Act
        Transaction result = transactionService.save(sampleTransaction);

        // Assert
        assertNotNull(result);
        assertEquals(sampleTransaction, result);
    }

    @Test
    public void testDeleteTransaction() {

        Long transactionId = sampleTransaction.getId();
        lenient().when(transactionRepo.findById(transactionId)).thenReturn(Optional.of(sampleTransaction));


        transactionService.delete(transactionId);


        verify(transactionRepo, times(1)).deleteById(transactionId);

    }

}

