import { useContext } from "react";

import Flag from "components/flag";
import { ClueContext } from "context/clue";
import { getPossibleCountries } from "data/dataHelper";
import styled from "styled-components";
import { DataContext } from "context/data";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import FlagCountry from "./flag-country";

const StyledContainer = styled.div`
  min-width: 240px;
`;

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 4px;
  padding: 2px;
`;

const Solver = () => {
  const { countries, characters } = useContext(DataContext);
  const { selectedClues, resetClues } = useContext(ClueContext);
  const possibleCountries = getPossibleCountries(
    countries,
    characters,
    selectedClues
  );

  return (
    <StyledContainer>
      <h3>Solver</h3>
      <div>
        <h4 className="solverHeader">Possible countries:</h4>
        <StyledItemContainer>
          <AnimatePresence initial={false}>
            {possibleCountries?.map((countryCode) => (
              <StyledItem
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, backgroundColor: "#ff5555" }}
                transition={{ duration: 1 }}
                key={countryCode}
              >
                <FlagCountry countryCode={countryCode} />
              </StyledItem>
            ))}
          </AnimatePresence>
        </StyledItemContainer>
        <Link to={`/compare?countries=${possibleCountries.join(",")}`}>
          Compare
        </Link>
      </div>
      {selectedClues?.length >= 1 && (
        <button onClick={() => resetClues()}>Reset</button>
      )}
    </StyledContainer>
  );
};

export default Solver;
