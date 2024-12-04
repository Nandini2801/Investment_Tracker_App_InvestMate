package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Watchlist;

import java.util.List;

public interface WatchlistService {
    Watchlist findWatchlistById(Long id);
    List<Watchlist> findAllWatchlists();
    List<Watchlist> getWatchlistsByCategory(String category);
    Watchlist createWatchlist(Watchlist watchlist);
    Watchlist updateWatchlist(Long id, Watchlist updatedWatchlist);
    void deleteWatchlist(Long id);
}
