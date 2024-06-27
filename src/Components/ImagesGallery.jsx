import { useEffect, useRef, useState } from "react";
import Spinner from "../Shared/Spinner";

const ImageGallery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [isSpinnerRefVisible, setIsSpinnerRefVisible] = useState(false);
  const limit = 10;
  const pageRef = useRef(1);
  let fetchImages = async (page = pageRef.current, isFEtchingFirstTime) => {
    try {
      isFEtchingFirstTime && setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${
          (page - 1) * limit
        }`
      );
      const result = await response.json();

      if (Array.isArray(result.products) && result.products.length) {
        setData((prev) => {
          const newData = [...prev, ...result.products];
          if (newData.length < result.total) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
      } else {
        setHasMore(false);
      }
      console.log(data);
    } catch {
      setHasMore(false);
      setIsError(true);
    } finally {
      isFEtchingFirstTime && setIsLoading(false);
    }
  };

  const spinnerRef = useRef();

  useEffect(() => {
    fetchImages(1, true);
  }, []);

  useEffect(() => {
    let ref = spinnerRef.current;
    let observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => ref && observer.unobserve(ref);
  }, [isSpinnerRefVisible]);

  useEffect(() => {
    if (isIntersecting) {
      fetchImages(pageRef.current + 1);
      pageRef.current = pageRef.current + 1;
    }
  }, [isIntersecting]);

  console.log(isIntersecting);
  return (
    <>
      {isError ? (
        <h1>Error in fetching data</h1>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.map((ele) => (
            <div key={ele.id} style={{ margin: "10px" }}>
              <img
                src={ele.images[0]}
                alt="Gallery"
                style={{
                  width: "300px",
                  height: "200px",
                  border: "1px solid black",
                }}
              />
            </div>
          ))}
        </div>
      )}
      {hasMore && (
        <div
          ref={(el) => {
            spinnerRef.current = el;
            setIsSpinnerRefVisible((prev) => !prev);
          }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default ImageGallery;
