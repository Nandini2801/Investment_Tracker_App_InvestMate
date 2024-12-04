package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.StockController;
import in.InvestHub.Backend.Models.Stock;
import in.InvestHub.Backend.Services.StockService;
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
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = StockController.class)
class StockControllerTest {

  public static final String API_STOCK = "/api/stocks";

  @MockBean
  private StockService stockService;

  @Autowired
  private MockMvc mockMvc;

  private Stock testStock;

  private static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @BeforeEach
  void setUp() {
    testStock = new Stock();
    testStock.setId(1L);
    testStock.setName("Test Stock");
    testStock.setSymbol("TEST");
  }

  @Test
  void testGetStockById() throws Exception {
    Long stockId = 1L;
    Mockito.when(stockService.findStockById(stockId)).thenReturn(testStock);

    mockMvc.perform(get(API_STOCK + "/{id}", stockId))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").value(testStock.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).findStockById(stockId);
  }

  @Test
  void testGetStockByIdNotFound() throws Exception {
    Long stockId = 2L;
    Mockito.when(stockService.findStockById(stockId)).thenReturn(null);

    mockMvc.perform(get(API_STOCK + "/{id}", stockId))
        .andExpect(status().isNotFound())
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).findStockById(stockId);
  }

  @Test
  void testGetAllStocks() throws Exception {
    List<Stock> stockList = new ArrayList<>();
    stockList.add(testStock);

    Mockito.when(stockService.findAllStocks()).thenReturn(stockList);

    mockMvc.perform(get(API_STOCK + "/"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].id").value(testStock.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).findAllStocks();
  }

  @Test
  void testCreateStock() throws Exception {
    Mockito.when(stockService.createStock(any(Stock.class))).thenReturn(testStock);

    mockMvc.perform(post(API_STOCK + "/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testStock))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(testStock.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).createStock(any(Stock.class));
  }

  @Test
  void testUpdateStock() throws Exception {
    Long stockId = 1L;
    Mockito.when(stockService.updateStock(eq(stockId), any(Stock.class))).thenReturn(testStock);

    mockMvc.perform(put(API_STOCK + "/{id}", stockId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testStock))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(testStock.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).updateStock(eq(stockId), any(Stock.class));
  }

  @Test
  void testUpdateStockNotFound() throws Exception {
    Long stockId = 2L;
    Mockito.when(stockService.updateStock(eq(stockId), any(Stock.class))).thenReturn(null);

    mockMvc.perform(put(API_STOCK + "/{id}", stockId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testStock))
        )
        .andExpect(status().isNotFound())
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).updateStock(eq(stockId), any(Stock.class));
  }

  @Test
  void testDeleteStock() throws Exception {
    Long stockId = 1L;

    mockMvc.perform(delete(API_STOCK + "/{id}", stockId))
        .andExpect(status().isOk())
        .andDo(MockMvcResultHandlers.print());

    verify(stockService).deleteStock(stockId);
  }
}
