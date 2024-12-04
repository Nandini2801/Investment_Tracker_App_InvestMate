import React from "react";
import { useState } from "react";
import {
  Box,
  Input,
  chakra,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AccordionPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import WatchlistDisplay from "../../components/Watchlist";
import Lottie from "lottie-react";
import search from "../../assets/animations/animation_lnaabm9a.json";
import Page500 from "../Page500";
import { PageLoader } from "../../components";
import useUsers from "../../hooks/useUser";
import useCustomStocks from "../../hooks/useCustomStocks";

function WatchlistPage() {
  const [selectedEquityDropdown, setSelectedEquityDropdown] = useState("");
  const [selectedMFDropdown, setSelectedMFDropdown] = useState("");
  const [isEquityPopupOpen, setIsEquityPopupOpen] = useState(false);
  const [isMFPopupOpen, setIsMFPopupOpen] = useState(false);
  const [createdEquityWatchlists, setCreatedEquityWatchlists] = useState([]);
  const [createdMFWatchlists, setCreatedMFWatchlists] = useState([]);
  const [editWatchlistName, setEditWatchlistName] = useState("");
  const [editWatchlistIndex, setEditWatchlistIndex] = useState(-1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [equityWatchlists, setEquityWatchlists] = useState([]);
  const [mfWatchlists, setMFWatchlists] = useState([]);

  // State to keep track of whether the center card should be displayed

  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { data, isError, isLoading, isSuccess } = useUsers(
    localStorage.getItem("userId")
  );
  const { data: stockData, isSuccess: stockIsSucces } = useCustomStocks();
  if (isError) {
    return <Page500 />;
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />;
  }
  // console.log(data);

  const watchlist = data.watchlists;

  // watchlist.length > 0
  //   ? setSelectedWatchlist(watchlist[0])
  //   : setSelectedWatchlist(null);

  // Function to create a new watchlist
  const handleCreateWatchlist = (watchlistType) => {
    const newWatchlist = {
      type: watchlistType,
      name: newWatchlistName,
      watchlistStocks: [],
    };

    if (watchlistType === "Equity") {
      setCreatedEquityWatchlists([...createdEquityWatchlists, newWatchlist]);
    } else {
      setCreatedMFWatchlists([...createdMFWatchlists, newWatchlist]);
    }
    setNewWatchlistName(""); // Clear the input field
    setIsEquityPopupOpen(false);
    setIsMFPopupOpen(false);
  };

  const stockOptions =
    stockIsSucces &&
    stockData.map((stock) => ({
      value: stock.symbol,
      label: `${stock.symbol} - ${stock.name}`,
    }));

  // Function to handle watchlist selection
  const handleSelectWatchlist = (watchlist) => {
    setSelectedWatchlist(watchlist);
  };

  // Function to add a stock to a watchlist
  const handleAddStockToWatchlist = (stock, watchlistType) => {
    const newWatchlistItem = {
      symbol: stock.symbol,
      name: stock.name,
      price: stock.price,
    };

    if (watchlistType === "equity") {
      // Add to equity watchlist
      const updatedEquityWatchlists = equityWatchlists.map((watchlist) => {
        if (watchlist.name === selectedEquityDropdown) {
          return {
            ...watchlist,
            stocks: [...watchlist.stocks, newWatchlistItem],
          };
        }
        return watchlist;
      });
      setEquityWatchlists(updatedEquityWatchlists);
    } else if (watchlistType === "mutual-fund") {
      // Add to mutual fund watchlist
      const updatedMFWatchlists = mfWatchlists.map((watchlist) => {
        if (watchlist.name === selectedMFDropdown) {
          return {
            ...watchlist,
            stocks: [...watchlist.stocks, newWatchlistItem],
          };
        }
        return watchlist;
      });
      setMFWatchlists(updatedMFWatchlists);
    }

    if (selectedWatchlist) {
      const updatedWatchlist = {
        ...selectedWatchlist,
        stocks: [...selectedWatchlist.stocks, newWatchlistItem],
      };
      handleSelectWatchlist(updatedWatchlist);
    }
  };

  const handleEditWatchlist = (index) => {
    setEditWatchlistIndex(index);
    setEditWatchlistName(
      createdEquityWatchlists[index]?.name ||
        createdMFWatchlists[index]?.name ||
        ""
    );
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editWatchlistIndex !== -1) {
      const updatedWatchlistName = editWatchlistName.trim();
      if (updatedWatchlistName !== "") {
        const updatedWatchlists =
          editWatchlistIndex < createdEquityWatchlists.length
            ? [...createdEquityWatchlists]
            : [...createdMFWatchlists];
        updatedWatchlists[editWatchlistIndex].name = updatedWatchlistName;
        if (editWatchlistIndex < createdEquityWatchlists.length) {
          setCreatedEquityWatchlists(updatedWatchlists);
        } else {
          setCreatedMFWatchlists(updatedWatchlists);
        }
      }
    }
    setIsEditModalOpen(false);
    setEditWatchlistIndex(-1);
    setEditWatchlistName("");
  };

  const handleDeleteWatchlist = (index) => {
    if (index !== -1) {
      if (index < createdEquityWatchlists.length) {
        const updatedWatchlists = [...createdEquityWatchlists];
        updatedWatchlists.splice(index, 1);
        setCreatedEquityWatchlists(updatedWatchlists);
      } else {
        const updatedWatchlists = [...createdMFWatchlists];
        updatedWatchlists.splice(index - createdEquityWatchlists.length, 1);
        setCreatedMFWatchlists(updatedWatchlists);
      }
    }
  };

  return (
    <Flex direction="column" wrap="wrap">
      <Box
        //p={6}
        w={{ base: "full", md: 4 / 12, xl: 4 / 12 }}
        //mx="a"
        pr={{ md: 20 }}
        rounded="lg"
        borderRadius="50px"
        alignContent={{ base: "center", md: "left" }}
      >
        <Select
          value={selectedOption}
          onChange={(selectedOption) => {
            const selectedStock = {
              symbol: selectedOption.value,
              name: selectedOption.label.split("-")[0],
            };
            handleAddStockToWatchlist(
              selectedStock,
              selectedEquityDropdown || selectedMFDropdown
            );
            setSelectedOption(selectedOption);
          }}
          options={stockOptions}
          placeholder="Search Stocks..."
          isClearable
          menuPlacement="bottom"
          styles={{
            option: (provided) => ({
              ...provided,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }),
          }}
          isSearchable
        />
      </Box>

      <Flex
        p={4}
        flexDirection={{ base: "column-reverse", md: "row", xl: "row" }}
        align="top"
        wrap="wrap"
        justifyContent={"space-between"}
      >
        {/* Display the selected watchlist */}
        {watchlist.length > 0 ? (
          <Box w={{ base: "full", md: 8 / 12 }}>
            <WatchlistDisplay
              selectedWatchlist={
                selectedWatchlist === null ? watchlist[0] : selectedWatchlist
              }
              onSelectWatchlist={setSelectedWatchlist} // Update the selected watchlist
            />
          </Box>
        ) : (
          <Box
            w={{ base: "full", md: 8 / 12 }}
            borderRadius="lg"
            textAlign="center"
            maxW="md"
          >
            <Text mt={4} fontSize="xl" fontWeight="bold">
              You are not watching anything here
            </Text>
            <Text mt={2}>
              Add stocks, ETFs, and indices here to start tracking them
            </Text>
            <Lottie animationData={search} />
          </Box>
        )}

        <Box
          w={{ base: "full", md: 4 / 12, xl: 4 / 12 }}
          p={6}
          textAlign="center"
          maxW="md"
          pt={7}
        >
          <Accordion allowToggle>
            <AccordionItem>
              <chakra.h5
                fontSize={{ base: "3xl", sm: "4xl" }}
                fontWeight="bold"
                color="primary.700"
                _dark={{ color: "gray.100" }}
                mb={6}
              >
                <AccordionButton bg="primary.400">
                  <Box as="span" flex="1" textAlign="left" w={"full"}>
                    Equity
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </chakra.h5>
              <AccordionPanel pb={4}>
                {watchlist
                  .filter((watchlist) => watchlist.category === "Equity")
                  .map((watchlist) => (
                    <Flex key={watchlist.name} alignItems="center" pb={2}>
                      <Text
                        fontWeight="bold"
                        width={"70%"}
                        onClick={() => setSelectedWatchlist(watchlist)} // Select watchlist on click
                        style={{ cursor: "pointer" }}
                      >
                        {watchlist.name}
                      </Text>
                      {editWatchlistIndex === watchlist.id ? (
                        <FontAwesomeIcon
                          width={"15%"}
                          icon={faCheck}
                          onClick={handleSaveEdit}
                        />
                      ) : (
                        <FontAwesomeIcon
                          width={"15%"}
                          icon={faEdit}
                          onClick={() => handleEditWatchlist(watchlist.id)}
                        />
                      )}
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faTrash}
                        onClick={() => handleDeleteWatchlist(index)}
                      />
                    </Flex>
                  ))}

                {createdEquityWatchlists.map((watchlist, index) => (
                  <Flex key={watchlist.name} alignItems="center" pb={2}>
                    <Text
                      fontWeight="bold"
                      width={"70%"}
                      onClick={() => setSelectedWatchlist(watchlist)} // Select watchlist on click
                      style={{ cursor: "pointer" }}
                    >
                      {watchlist.name}
                    </Text>
                    {editWatchlistIndex === index ? (
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faCheck}
                        onClick={handleSaveEdit}
                      />
                    ) : (
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faEdit}
                        onClick={() => handleEditWatchlist(index)}
                      />
                    )}
                    <FontAwesomeIcon
                      width={"15%"}
                      icon={faTrash}
                      onClick={() => handleDeleteWatchlist(index)}
                    />
                  </Flex>
                ))}

                <Text
                  fontWeight="bold"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={8}
                  onClick={() => setIsEquityPopupOpen(true)} // Select watchlist on click
                  style={{ cursor: "pointer" }}
                  align={"left"}
                  bgColor={"primary.500"}
                  color={"white"}
                >
                  <FontAwesomeIcon width={"15%"} icon={faPlus} />
                  Create Equity Watchlist
                </Text>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <chakra.h5
                fontSize={{ base: "3xl", sm: "4xl" }}
                fontWeight="bold"
                color="primary.700"
                _dark={{ color: "gray.100" }}
                mb={6}
              >
                <AccordionButton bg="primary.400">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    w={{ base: "full", md: 4 / 12, xl: 4 / 12 }}
                  >
                    Mutual Fund
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </chakra.h5>
              <AccordionPanel pb={4}>
                {watchlist
                  .filter((watchlist) => watchlist.category !== "Equity")
                  .map((watchlist) => (
                    <Flex key={watchlist.name} alignItems="center" pb={2}>
                      <Text
                        fontWeight="bold"
                        width={"70%"}
                        onClick={() => setSelectedWatchlist(watchlist)} // Select watchlist on click
                        style={{ cursor: "pointer" }}
                      >
                        {watchlist.name}
                      </Text>
                      {editWatchlistIndex === watchlist.id ? (
                        <FontAwesomeIcon
                          width={"15%"}
                          icon={faCheck}
                          onClick={handleSaveEdit}
                        />
                      ) : (
                        <FontAwesomeIcon
                          width={"15%"}
                          icon={faEdit}
                          onClick={() => handleEditWatchlist(watchlist.id)}
                        />
                      )}
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faTrash}
                        onClick={() => handleDeleteWatchlist(index)}
                      />
                    </Flex>
                  ))}
                {createdMFWatchlists.map((watchlist, index) => (
                  <Flex key={watchlist.name} alignItems="center" pb={2}>
                    <Text
                      fontWeight="bold"
                      width={"70%"}
                      onClick={() => setSelectedWatchlist(watchlist)} // Select watchlist on click
                      style={{ cursor: "pointer" }}
                    >
                      {watchlist.name}
                    </Text>
                    {editWatchlistIndex === index ? (
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faCheck}
                        onClick={handleSaveEdit}
                      />
                    ) : (
                      <FontAwesomeIcon
                        width={"15%"}
                        icon={faEdit}
                        onClick={() => handleEditWatchlist(index)}
                      />
                    )}
                    <FontAwesomeIcon
                      width={"15%"}
                      icon={faTrash}
                      onClick={() => handleDeleteWatchlist(index)}
                    />
                  </Flex>
                ))}

                <Text
                  fontWeight="bold"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  height={8}
                  onClick={() => setIsMFPopupOpen(true)} // Select watchlist on click
                  style={{ cursor: "pointer" }}
                  align={"left"}
                  bgColor={"primary.500"}
                  color={"white"}
                >
                  <FontAwesomeIcon width={"15%"} icon={faPlus} />
                  Create MF Watchlist
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Flex>

      {/* Create Watchlist Popups */}
      <Modal
        isOpen={isEquityPopupOpen}
        onClose={() => setIsEquityPopupOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Equity Watchlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              placeholder="Enter watchlist name"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleCreateWatchlist("Equity");
              }}
              mr={3}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                setIsEquityPopupOpen(false), setEditWatchlistIndex(null);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isMFPopupOpen} onClose={() => setIsMFPopupOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create MF Watchlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newWatchlistName}
              onChange={(e) => setNewWatchlistName(e.target.value)}
              placeholder="Enter watchlist name"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={() => {
                handleCreateWatchlist("Mutual-Fund");
              }}
              mr={3}
            >
              Create
            </Button>
            <Button onClick={() => setIsMFPopupOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Edit Watchlist Name Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Watchlist Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={editWatchlistName}
              onChange={(e) => setEditWatchlistName(e.target.value)}
              placeholder="Edit watchlist name"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleSaveEdit} mr={3}>
              Save
            </Button>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default WatchlistPage;
