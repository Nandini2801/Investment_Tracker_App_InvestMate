import React from "react";
import { ESGCard } from "../../components";
import "../ESGPage/ESGPage.css";
import {
  Container,
  Stack,
  Heading,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  SkeletonCircle,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Button,
} from "@chakra-ui/react";

function ESGPage() {
  return (
    <div>
      <Container maxW="full" py={6}>
        <Heading as="h1" size="xl" mb={4} textAlign="center">
          ESG for Beginners: Environmental, Social, and Governance Investing
        </Heading>

        <Stack spacing={4}>
          <p>
            ESG (Environmental, Social, and Governance) investing is important
            for various reasons, including its potential to create positive
            impact and sustainable returns.
          </p>
        </Stack>
      </Container>

      <div>
        <SimpleGrid columns={{ base: 1, sm: 3, md: 3 }} spacing={4}>
          <ESGCard
            term="Environmental"
            content="ESG investing considers the environmental impact of a company's operations, focusing on issues like climate change, resource conservation, and pollution control."
          />
          <ESGCard
            term="Social"
            content="The social aspect of ESG investing evaluates a company's impact on society,employees, community engagement, and commitment to diversity and inclusion."
          />
          <ESGCard
            term="Governance"
            content="Governance in ESG investing assesses a company's internal policies, leadership structure, and adherence to ethical and legal standards."
          />
        </SimpleGrid>
      </div>
      <Container maxW="full" py={6}>
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          What is ESG?
        </Heading>

        <Stack spacing={4}>
          <p>
            Environmental, social and governance criteria, or ESG, is a
            framework companies use to evaluate their sustainability.
            Environmental factors look at the conservation of the natural world,
            social factors examine how a company treats people both inside and
            outside the company and governance factors consider how a company is
            run. Here are some examples of what each ESG category covers:
          </p>
        </Stack>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  bgGradient: "linear(to-t, #6B46C1, #805AD5)",
                  color: "white",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Environmental
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} ml={2}>
              <ul>
                <li>Carbon emissions</li>
                <li>Air and water pollution</li>
                <li>Deforestation</li>
                <li>Green energy initiatives</li>
                <li>Waste management</li>
                <li>Water usage</li>
              </ul>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  bgGradient: "linear(to-t, #6B46C1, #805AD5)",
                  color: "white",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Social
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} ml={2}>
              <ul>
                <li>Employee gender and diversity</li>
                <li>Data security</li>
                <li>Customer satisfaction</li>
                <li>Company sexual harassment policies</li>
                <li>Human rights at home and abroad</li>
              </ul>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton
                _expanded={{
                  bgGradient: "linear(to-t, #6B46C1, #805AD5)",
                  color: "white",
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  Governance
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} ml={2}>
              <ul>
                <li>Diversity of board members</li>
                <li>Political contributions</li>
                <li>Executive pay</li>
                <li>Large-scale lawsuits</li>
                <li>Internal corruption</li>
                <li>Lobbying</li>
              </ul>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
      <div className="youtube">
        <Heading as="h2" size="xl" mb={4} textAlign="center">
          In-Depth Tutorial: Mastering ESG Investing on YouTube
        </Heading>

        <div className="video-box">
          <div className="youtube-video">
            <div className="video-container">
              <iframe
                title="naruto"
                src="https://www.youtube.com/embed/AkbGz3CYvqE"
                allowFullScreen
              />
            </div>
          </div>
        </div>
        <div className="video-box">
          <div className="youtube-video">
            <div className="video-container">
              <iframe
                title="naruto"
                src="https://www.youtube.com/embed/Qd2D-0lQ36E"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <Box
          paddingX="4"
          paddingBottom="4"
          boxShadow="lg"
          bg="white"
          maxW="800px"
          mx="auto"
        >
          <Heading as="h2" size="xl" mb={4} textAlign="center">
            ESG Investment Benifits
          </Heading>
          <SkeletonCircle size="10" />
          <Box mt="4">
            <Tag colorScheme="purple" mb="2" mr="2">
              Improved risk management
            </Tag>
            <Tag colorScheme="purple" mb="2" mr="2">
              Enhanced portfolio performance
            </Tag>
            <Tag colorScheme="purple" mb="2" mr="2">
              Making a positive impact on the environment
            </Tag>
            <Tag colorScheme="purple" mb="2" mr="2">
              Greater innovation and adaptability
            </Tag>
            <Tag colorScheme="purple" mb="2" mr="2">
              Attracting and retaining talent
            </Tag>
            <Tag colorScheme="purple" mb="2" mr="2">
              Strengthened regulatory compliance
            </Tag>
            <Tag colorScheme="purple" mb="2">
              Contribution to global sustainability goals
            </Tag>
          </Box>
        </Box>
      </div>
      <div>
        <div>
          <Heading as="h2" size="xl" textAlign="center" mt="6">
            Books for ESG Investment
          </Heading>
          <Tabs defaultIndex={0} isFitted colorScheme="purple">
            <TabList>
              <Tab fontSize="sm">Book-1</Tab>
              <Tab fontSize="sm">Book-2</Tab>
              <Tab fontSize="sm">Book-3</Tab>
              <Tab fontSize="sm">Book-4</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  display={{ base: "block", md: "flex" }}
                  p={4}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="md"
                >
                  <Image
                    boxSize={{ base: "150px", md: "200px", lg: "200px" }}
                    fit="auto"
                    src="https://m.media-amazon.com/images/I/71WAjAsaVdL._AC_UF894,1000_QL80_.jpg"
                  />
                  <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                    <div>The Power of ESG Investing - Book Title</div>
                    <p style={{ margin: "10px 0" }}>
                      Discription : This book helps to navigate the complex
                      landscape of environmental, social, and governance (ESG)
                      factors in investing. Look no further than &quot;The Power
                      of ESG Investing&quot; by Robert Buckley.
                    </p>
                    <Button
                      mt="4"
                      onClick={() =>
                        window.open(
                          "https://www.amazon.in/Power-ESG-Investing-Environmental-Sustainable/dp/1922435570",
                          "_blank"
                        )
                      }
                    >
                      View Book
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display={{ base: "block", md: "flex" }}
                  p={4}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="md"
                >
                  <Image
                    boxSize={{ base: "150px", md: "200px", lg: "200px" }}
                    fit="auto"
                    src="https://m.media-amazon.com/images/I/81GMHMod6YL._AC_UF1000,1000_QL80_.jpg"
                  />
                  <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                    <div>
                      Your Essential Guide to Sustainable Investing- Book Title
                    </div>
                    <p style={{ margin: "10px 0" }}>
                      Discriptoin : This book arms you with a practical guide to
                      investing sustainably, including how to effectively choose
                      your asset allocation strategy, and select the managers
                      and funds through which your money can create the change
                      you want to see in the world.
                    </p>
                    <Button
                      mt="4"
                      onClick={() =>
                        window.open(
                          "https://www.amazon.in/Your-Essential-Guide-Sustainable-Investing/dp/0857199048",
                          "_blank"
                        )
                      }
                    >
                      View Book
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display={{ base: "block", md: "flex" }}
                  p={4}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="md"
                >
                  <Image
                    boxSize={{ base: "150px", md: "200px", lg: "200px" }}
                    fit="auto"
                    src="https://m.media-amazon.com/images/I/51dds1WMwHL.jpg"
                  />
                  <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                    <div>Stock Market Investing for Beginners- Book Title</div>
                    <p style={{ margin: "10px 0" }}>
                      Discription: This book provides a good foundation for the
                      beginning investor who is setting out to venture in the
                      stock market. It tells you in plain English about the
                      fundamentals of stock market and investment strategies to
                      deepen your investing literacy.
                    </p>
                    <Button
                      mt="4"
                      onClick={() =>
                        window.open(
                          "https://www.amazon.in/Stock-Market-Investing-Beginners-Successfully-ebook/dp/B00GXSRO8E",
                          "_blank"
                        )
                      }
                    >
                      View Book
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  display={{ base: "block", md: "flex" }}
                  p={4}
                  bg="white"
                  boxShadow="lg"
                  borderRadius="md"
                >
                  <Image
                    boxSize={{ base: "150px", md: "200px", lg: "200px" }}
                    fit="auto"
                    src="https://m.media-amazon.com/images/I/51aEtp7NjqL.jpg"
                  />
                  <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
                    <div>Stock Market Investing For Beginners - Book Title</div>
                    <p style={{ margin: "10px 0" }}>
                      Discription: The Investment Guide - How to benefit from
                      the crisis, invest in stocks and generate long-term
                      passive income incl. ETF and Stock Picking Checklist.
                    </p>
                    <Button
                      mt="4"
                      onClick={() =>
                        window.open(
                          "https://www.amazon.in/Stock-Market-Investing-Beginners-Investment-ebook/dp/B08BQLZTMB",
                          "_blank"
                        )
                      }
                    >
                      View Book
                    </Button>
                  </Box>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ESGPage;
