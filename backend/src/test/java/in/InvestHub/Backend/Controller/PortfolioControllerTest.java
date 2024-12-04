package in.InvestHub.Backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.InvestHub.Backend.Controllers.PortfolioController;
import in.InvestHub.Backend.Models.Portfolio;
import in.InvestHub.Backend.Services.PortfolioService;
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
@WebMvcTest(controllers = PortfolioController.class)
class PortfolioControllerTest {

  public static final String API_PORTFOLIO = "/api/portfolio";

  @MockBean
  private PortfolioService portfolioService;

  @Autowired
  private MockMvc mockMvc;

  private Portfolio testPortfolio;

  private static String asJsonString(final Object obj) {
    try {
      return new ObjectMapper().writeValueAsString(obj);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @BeforeEach
  void setUp() {
    testPortfolio = new Portfolio();
    testPortfolio.setId(1L);
    testPortfolio.setCategory("Sample Category");
    testPortfolio.setCreatedAt(new Date());
    testPortfolio.setCreatedPrice(BigDecimal.valueOf(100.0));
    testPortfolio.setCurrentPrice(BigDecimal.valueOf(105.0));
  }

  @Test
  void testCreatePortfolio() throws Exception {
    Mockito.when(portfolioService.createPortfolio(any(Portfolio.class))).thenReturn(testPortfolio);

    mockMvc.perform(post(API_PORTFOLIO + "/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testPortfolio))
        )
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").value(testPortfolio.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(portfolioService).createPortfolio(any(Portfolio.class));
  }

  @Test
  void testUpdatePortfolio() throws Exception {
    Long portfolioId = 1L;
    Mockito.when(portfolioService.updatePortfolio(any(Portfolio.class), eq(portfolioId))).thenReturn(testPortfolio);

    mockMvc.perform(put(API_PORTFOLIO + "/{portfolio_id}", portfolioId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(testPortfolio))
        )
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(testPortfolio.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(portfolioService).updatePortfolio(any(Portfolio.class), eq(portfolioId));
  }

  @Test
  void testDeletePortfolio() throws Exception {
    Long portfolioId = 1L;

    mockMvc.perform(delete(API_PORTFOLIO + "/{portfolio_id}", portfolioId))
        .andExpect(status().isOk())
        .andDo(MockMvcResultHandlers.print());

    verify(portfolioService).deletePortfolio(portfolioId);
  }

  @Test
  void testGetAllPortfolios() throws Exception {
    List<Portfolio> portfolioList = new ArrayList<>();
    portfolioList.add(testPortfolio);

    Mockito.when(portfolioService.getAllPortfolio()).thenReturn(portfolioList);

    mockMvc.perform(get(API_PORTFOLIO + "/"))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$[0].id").value(testPortfolio.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(portfolioService).getAllPortfolio();
  }

  @Test
  void testGetSinglePortfolio() throws Exception {
    Long portfolioId = 1L;
    Mockito.when(portfolioService.getPortfolioById(portfolioId)).thenReturn(testPortfolio);

    mockMvc.perform(get(API_PORTFOLIO + "/{portfolio_id}", portfolioId))
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(jsonPath("$.id").value(testPortfolio.getId()))
        .andDo(MockMvcResultHandlers.print());

    verify(portfolioService).getPortfolioById(portfolioId);
  }
}
