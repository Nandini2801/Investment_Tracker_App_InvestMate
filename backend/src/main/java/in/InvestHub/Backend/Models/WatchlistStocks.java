package in.InvestHub.Backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
@Table(name = "watchliststocks")
public class WatchlistStocks {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long stockId;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "watchlist_id")
  private Watchlist watchlist;
}
