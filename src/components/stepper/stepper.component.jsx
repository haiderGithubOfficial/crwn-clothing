import { useState } from "react";
import "./stepper.styles.css";

const Stepper = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const previousPage = (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (pageNumber < 5) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="stepper">
      <div className="container-unique">
        <header>Simpletrip Stepper</header>
        <div className="progress-bar">
          <div className="step">
            <div
              className={`bullet ${
                pageNumber === 1 ? "active" : pageNumber > 1 ? "complete" : ""
              }`}
            >
              <span>1</span>
            </div>
            <p>Details</p>
          </div>
          <div className="step">
            <div
              className={`bullet ${
                pageNumber === 2 ? "active" : pageNumber > 2 ? "complete" : ""
              }`}
            >
              <span>2</span>
            </div>
            <p>Personal Info</p>
          </div>
          <div className="step">
            <div
              className={`bullet ${
                pageNumber === 3 ? "active" : pageNumber > 3 ? "complete" : ""
              }`}
            >
              <span>3</span>
            </div>
            <p>Payment</p>
          </div>
          <div className="step">
            <div
              className={`bullet ${
                pageNumber === 4 ? "active" : pageNumber > 4 ? "complete" : ""
              }`}
            >
              <span className="check fas fa-check" />
            </div>
            <p>Confirmation</p>
          </div>
        </div>
        <div className="form-outer">
          <form action="#">
            <div
              className={`page slide-page ${
                pageNumber === 1
                  ? ""
                  : pageNumber === 2
                  ? "slide-page25"
                  : pageNumber === 3
                  ? "slide-page50"
                  : pageNumber === 4
                  ? "slide-page75"
                  : pageNumber === 5
                  ? "slide-page75"
                  : "slide-page75"
              }`}
            >
              <div className="title">Details:</div>
              <div className="field">
                <button className="firstNext next" onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>
            <div className="page">
              <div className="title">Personal Info</div>
              <div className="field btns">
                <button className="prev-1 prev" onClick={previousPage}>
                  Previous
                </button>
                <button className="next-1 next" onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>
            <div className="page">
              <div className="title">Payment:</div>
              <div className="field btns">
                <button className="prev-2 prev" onClick={previousPage}>
                  Previous
                </button>
                <button className="next-2 next" onClick={nextPage}>
                  Next
                </button>
              </div>
            </div>
            <div className="page">
              <div className="title">Confirmation:</div>
              <div className="field btns">
                <button className="prev-3 prev" onClick={previousPage}>
                  Previous
                </button>
                <button className="submit" onClick={nextPage}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
