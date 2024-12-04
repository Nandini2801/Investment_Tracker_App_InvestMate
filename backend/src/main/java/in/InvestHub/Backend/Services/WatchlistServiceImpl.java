package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Watchlist;
import in.InvestHub.Backend.Repositories.WatchlistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistServiceImpl implements WatchlistService{
    private final WatchlistRepo watchlistRepo;

    @Autowired
    public WatchlistServiceImpl(WatchlistRepo watchlistRepo) {
        this.watchlistRepo = watchlistRepo;
    }

    @Override
    public Watchlist findWatchlistById(Long id) {
        return watchlistRepo.findById(id).orElse(null);
    }

    @Override
    public List<Watchlist> findAllWatchlists() {
        return watchlistRepo.findAll();
    }
    @Override
    public List<Watchlist> getWatchlistsByCategory(String category){
        return watchlistRepo.findByCategory(category);
    }

    @Override
    public Watchlist createWatchlist(Watchlist watchlist) {
        return watchlistRepo.save(watchlist);
    }

    @Override
    public Watchlist updateWatchlist(Long id, Watchlist updatedWatchlist) {
        Optional<Watchlist> existingWatchlistOptional = watchlistRepo.findById(id);

        if (!existingWatchlistOptional.isPresent()) {
            return null; // Handle not found
        }

        Watchlist existingWatchlist = existingWatchlistOptional.get();

        // Update fields of the existing stock with the new values
        existingWatchlist.setName(updatedWatchlist.getName());
        existingWatchlist.setCategory(updatedWatchlist.getCategory());

        return watchlistRepo.save(existingWatchlist);
    }

    @Override
    public void deleteWatchlist(Long id) {
        watchlistRepo.deleteById(id);
    }
}
