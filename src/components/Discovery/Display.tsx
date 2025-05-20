import NextImage from "next/image";
import React, { Fragment, useEffect, useState, useContext, useRef } from "react";
import { Card, Overlay, Popover, Nav, Tab, Col, Row } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import DiscoveryContext from "../../contexts/DiscoveryContext";
import MoreCategoryItemInfo from "../Modals/MoreCategoryItemInfo";

export default function DiscoveryDisplay() {
  const { browsingCategories, fetchCategoryItem } = useContext(DiscoveryContext);
  const [categoryItems, setCategoryItems] = useState([]);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(undefined);
  const [currentCategory, setCurrentCategory] = useState("New Releases");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const fetchData = async (
    itemsArray: Array<any>,
    itemsCategory: string,
    refresh?: boolean
  ) => {
    // a fake async api call like which sends
    // 20 more records in .5 secs
    if (browsingCategories[itemsCategory]) {
      setIsLoading(true);
      const currentPage = refresh ? 0 : page;
      let currentHasMore = refresh ? true : hasMore;
      setTimeout(async () => {
        await browsingCategories[itemsCategory](currentPage).then(
          (newReleasePage: Array<any>) => {
            const filteredArray = newReleasePage.filter((item) => item);
            if (
              filteredArray &&
              (filteredArray.length === 0 || filteredArray.length < 16)
            ) {
              currentHasMore = false;
              setIsLoading(false);
            }
            if (refresh) {
              setCategoryItems([...filteredArray]);
            } else {
              setCategoryItems(itemsArray.concat(filteredArray));
            }
            setHasMore(currentHasMore);
            setPage(currentPage + 1);
          }
        );
      }, 200);
    }
  };

  const handleNewCategory = async (category: string) => {
    setCurrentCategory(category);
    await fetchData(categoryItems, category, true);
  };

  const handleMoreInfo = async (categoryItem: any) => {
    const item = await fetchCategoryItem(categoryItem.id, categoryItem.type);
    setSelectedCategoryItem(item);
    // fetchCategoryItemTracks()
    setShowMoreInfo(!showMoreInfo);
  }

  useEffect(() => {
    if (hasMore) {
      fetchData(categoryItems, currentCategory);
    }
  });

  return (
    <Fragment>
      {selectedCategoryItem ? (
        <MoreCategoryItemInfo
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
          categoryItem={selectedCategoryItem}
        />
      ) : (
        <Fragment></Fragment>
      )}

      <Tab.Container defaultActiveKey="New Releases">
        <Row>
          <Col
            sm={2}
            md={2}
            style={{
              height: "40rem",
            }}
            className="category-column overflow-scroll bg-surface"
          >
            <Nav variant="pills" className="flex-column">
              <Fragment>
                {Object.keys(browsingCategories).map(
                  (category: string, idx) => (
                    <Nav.Item key={category}>
                      <Nav.Link
                        eventKey={category}
                        disabled={isLoading}
                        onClick={async () => await handleNewCategory(category)}
                        className="text-text hover:text-primary"
                      >
                        {category}{" "}
                        {idx === 0 ? (
                          <Fragment></Fragment>
                        ) : (
                          <Fragment>Playlists</Fragment>
                        )}
                      </Nav.Link>
                    </Nav.Item>
                  )
                )}
              </Fragment>
            </Nav>
          </Col>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey={currentCategory}>
                <Card
                  className="responsive bg-surface"
                  style={{ height: "55rem", width: "100%" }}
                >
                  <Card.Header as="h2" className="text-text text-center">
                    {currentCategory === "New Releases" ? (
                      <Fragment>{currentCategory}</Fragment>
                    ) : (
                      <Fragment>{currentCategory} Playlists</Fragment>
                    )}
                  </Card.Header>
                  <Card.Body className="overflow-scroll bg-background">
                    <InfiniteScroll
                      dataLength={categoryItems.length * 2}
                      next={() => fetchData(categoryItems, currentCategory)}
                      hasMore={hasMore}
                      loader={<h4 className="text-text">Loading...</h4>}
                      endMessage={
                        <p className="text-text text-center">
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      {categoryItems.length > 0 &&
                        categoryItems.map((categoryItem, idx) => (
                          <Fragment key={`${categoryItem?.id}-${idx}`}>
                            {categoryItem ? (
                              <div className="responsive py-4">
                                <div className="gallery" ref={containerRef}>
                                  <a
                                    onClick={() => handleMoreInfo(categoryItem)}
                                    href={`#more-info-${categoryItem.id}`}
                                    className="hover:opacity-90 transition"
                                  >
                                    <img
                                      src={categoryItem.images[0]?.url}
                                      alt={`${categoryItem.name}-image`}
                                      width={categoryItem.images[0]?.width}
                                      height={categoryItem.images[0]?.height}
                                      className="rounded-lg"
                                    />
                                    <div className="album-name text-text">
                                      {categoryItem.artists ? (
                                        categoryItem.artists[0].name
                                      ) : (
                                        categoryItem.name
                                      )}
                                    </div>
                                    <div className="more-info text-text-secondary">
                                      Click for More Info
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <Fragment></Fragment>
                            )}
                          </Fragment>
                        ))}
                    </InfiniteScroll>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );
}
