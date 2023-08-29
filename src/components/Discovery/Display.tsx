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
            className="category-column overflow-scroll"
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
                  className="responsive"
                  style={{ height: "55rem", width: "100%" }}
                >
                  <Card.Header as="h2" style={{ textAlign: "center" }}>
                    {currentCategory === "New Releases" ? (
                      <Fragment>{currentCategory}</Fragment>
                    ) : (
                      <Fragment>{currentCategory} Playlists</Fragment>
                    )}
                  </Card.Header>
                  <Card.Body className="overflow-scroll">
                    <InfiniteScroll
                      dataLength={categoryItems.length * 2} //This is important field to render the next data
                      next={() => fetchData(categoryItems, currentCategory)}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
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
                                  >
                                    <img
                                      src={categoryItem.images[0]?.url}
                                      alt={`${categoryItem.name}-image`}
                                      width={categoryItem.images[0]?.width}
                                      height={categoryItem.images[0]?.height}
                                    />
                                    <div className="album-name">
                                      {categoryItem.name}
                                    </div>
                                    <div className="more-info">
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
