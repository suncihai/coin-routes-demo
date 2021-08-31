import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as assetsActions from "./actions/assetsActions";
import {
  selectAsset,
  selectOrderBookBids,
  selectOrderBookAsks,
} from "./selectors/assetsSelectors";
import { Chart } from "./components/Chart";
import { OrderBook } from "./components/OrderBook";
import { Container } from "./components/Container";
import "./App.css";

export const App = () => {
  const dispatch = useDispatch();
  const asset = useSelector(selectAsset);
  const { assetParam } = useParams<{ assetParam: string }>();
  const orderBookBids = useSelector(selectOrderBookBids);
  const orderBookAsks = useSelector(selectOrderBookAsks);

  useEffect(() => {
    dispatch(assetsActions.updateAssetAction(assetParam.toUpperCase()));
    dispatch(assetsActions.assetsWebSocketConnectAction());
    dispatch(assetsActions.assetsWebSocketStartMessageAction());
  }, [dispatch, assetParam]);

  return (
    <Container className="App" width="800px" margin="0 auto">
      <Chart />
      <Container flex>
        <OrderBook type="bid" orderBook={orderBookBids} asset={asset} />
        <OrderBook type="ask" orderBook={orderBookAsks} asset={asset} />
      </Container>
    </Container>
  );
};