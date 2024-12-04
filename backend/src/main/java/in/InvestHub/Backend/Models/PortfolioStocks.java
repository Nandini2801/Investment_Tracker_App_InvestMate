package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "portfoliostocks")
public class PortfolioStocks {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long stockId;
  private String stockName;
  private Integer quantity;
  private BigDecimal price;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "portfolio_id")
  private Portfolio portfolio;
}
