package in.InvestHub.Backend.Services;

import in.InvestHub.Backend.Models.Watchlist;
import in.InvestHub.Backend.Repositories.WatchlistRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WatchlistServiceImplTest {

  @Mock
  private WatchlistRepo watchlistRepository;

  @InjectMocks
  private WatchlistServiceImpl watchlistService;

  private Watchlist sampleWatchlist;

  @BeforeEach
  public void setUp() {
    sampleWatchlist = new Watchlist();
    sampleWatchlist.setId(1L);
    sampleWatchlist.setName("Sample Watchlist");
    sampleWatchlist.setCategory("SAMPLE");
  }

  @Test
  public void testFindWatchlistById() {
    Long watchlistId = sampleWatchlist.getId();
    when(watchlistRepository.findById(watchlistId)).thenReturn(Optional.of(sampleWatchlist));

    Watchlist result = watchlistService.findWatchlistById(watchlistId);

    assertNotNull(result);
    assertEquals(sampleWatchlist, result);

    verify(watchlistRepository, times(1)).findById(watchlistId);
  }

  @Test
  public void testFindWatchlistByIdNotFound() {
    Long watchlistId = 2L;
    when(watchlistRepository.findById(watchlistId)).thenReturn(Optional.empty());

    Watchlist result = watchlistService.findWatchlistById(watchlistId);

    assertNull(result);

    verify(watchlistRepository, times(1)).findById(watchlistId);
  }

  @Test
  public void testFindAllWatchlists() {
    List<Watchlist> watchlistList = new ArrayList<>();
    watchlistList.add(sampleWatchlist);
    when(watchlistRepository.findAll()).thenReturn(watchlistList);

    List<Watchlist> result = watchlistService.findAllWatchlists();

    assertNotNull(result);
    assertEquals(watchlistList, result);

    verify(watchlistRepository, times(1)).findAll();
  }
  @Test
  public void testGetWatchlistsByCategory() {
    String category = "SAMPLE";
    List<Watchlist> watchlistList = new ArrayList<>();
    watchlistList.add(sampleWatchlist);

    when(watchlistRepository.findByCategory(category)).thenReturn(watchlistList);

    List<Watchlist> result = watchlistService.getWatchlistsByCategory(category);

    assertNotNull(result);
    assertEquals(watchlistList, result);

    verify(watchlistRepository, times(1)).findByCategory(category);
  }

  @Test
  public void testCreateWatchlist() {
    when(watchlistRepository.save(any(Watchlist.class))).thenReturn(sampleWatchlist);

    Watchlist createdWatchlist = watchlistService.createWatchlist(sampleWatchlist);

    assertNotNull(createdWatchlist);
    assertEquals(sampleWatchlist, createdWatchlist);

    verify(watchlistRepository, times(1)).save(sampleWatchlist);
  }

  @Test
  public void testUpdateWatchlist() {
    Long watchlistId = sampleWatchlist.getId();
    Watchlist updatedWatchlist = new Watchlist();
    updatedWatchlist.setName("Updated Watchlist");
    updatedWatchlist.setCategory("UPDATED");

    when(watchlistRepository.findById(watchlistId)).thenReturn(Optional.of(sampleWatchlist));
    when(watchlistRepository.save(sampleWatchlist)).thenReturn(updatedWatchlist);

    Watchlist result = watchlistService.updateWatchlist(watchlistId, updatedWatchlist);

    assertNotNull(result);
    assertEquals(updatedWatchlist, result);

    verify(watchlistRepository, times(1)).findById(watchlistId);
    verify(watchlistRepository, times(1)).save(sampleWatchlist);
  }

  @Test
  public void testUpdateWatchlistNotFound() {
    Long watchlistId = 2L;
    Watchlist updatedWatchlist = new Watchlist();
    updatedWatchlist.setName("Updated Watchlist");
    updatedWatchlist.setCategory("UPDATED");

    when(watchlistRepository.findById(watchlistId)).thenReturn(Optional.empty());

    Watchlist result = watchlistService.updateWatchlist(watchlistId, updatedWatchlist);

    assertNull(result);

    verify(watchlistRepository, times(1)).findById(watchlistId);
    verify(watchlistRepository, never()).save(any());
  }

  @Test
  public void testDeleteWatchlist() {
    Long watchlistId = sampleWatchlist.getId();

    watchlistService.deleteWatchlist(watchlistId);

    verify(watchlistRepository, times(1)).deleteById(watchlistId);
  }
}
