package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.PriceController;
import in.InvestHub.Backend.Models.Price;
import in.InvestHub.Backend.Services.PriceService;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = PriceController.class)
class PriceControllerTest {

  public static final String API_PRICE = "/api/price";

  @MockBean
  private PriceService priceService;

  @Autowired
  private MockMvc mockMvc;

  private Price testPrice;

  private static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @BeforeEach
  void setUp() {
    testPrice = new Price();
    testPrice.setId(1L);
    testPrice.setDate(new Date());
    testPrice.setOpenPrice(BigDecimal.valueOf(100.0));
    testPrice.setHighPrice(BigDecimal.valueOf(110.0));
    testPrice.setLowPrice(BigDecimal.valueOf(90.0));
    testPrice.setClosePrice(BigDecimal.valueOf(105.0));
  }

  @Test
  void testCreatePrice() throws Exception {
    Mockito.when(priceService.createPrice(any(Price.class))).thenReturn(testPrice);

    mockMvc.perform(post(API_PRICE + "/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testPrice))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(testPrice.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(priceService).createPrice(any(Price.class));
  }

  @Test
  void testUpdatePrice() throws Exception {
    Long priceId = 1L;
    Mockito.when(priceService.updatePrice(any(Price.class), eq(priceId))).thenReturn(testPrice);

    mockMvc.perform(put(API_PRICE + "/{price_id}", priceId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testPrice))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(testPrice.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(priceService).updatePrice(any(Price.class), eq(priceId));
  }

  @Test
  void testDeletePrice() throws Exception {
    Long priceId = 1L;

    mockMvc.perform(delete(API_PRICE + "/{price_id}", priceId))
        .andExpect(status().isOk())
        .andDo(MockMvcResultHandlers.print());

    verify(priceService).deletePrice(priceId);
  }

  @Test
  void testGetAllPrices() throws Exception {
    List<Price> priceList = new ArrayList<>();
    priceList.add(testPrice);

    Mockito.when(priceService.getAllPrice()).thenReturn(priceList);

    mockMvc.perform(get(API_PRICE + "/"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].id").value(testPrice.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(priceService).getAllPrice();
  }

  @Test
  void testGetSingleAccount() throws Exception {
    Long priceId = 1L;
    Mockito.when(priceService.getPriceById(priceId)).thenReturn(testPrice);

    mockMvc.perform(get(API_PRICE + "/{price_id}", priceId))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").value(testPrice.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(priceService).getPriceById(priceId);
  }
}
