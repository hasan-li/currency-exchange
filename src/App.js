import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { useCookies } from 'react-cookie';

import './App.css';
import { getRates, getRatesFromDate } from './services/rates';
import { USD, GBP, SGD, MARCH_2015, JUNE_2017 } from './const/rates';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [allRates, setAllRates] = useState([]);
  const [cookies, setCookies] = useCookies(['amount', 'rates']);
  useEffect(() => {
    !cookies.amount && setCookies('amount', 200);
  }, [cookies.amount]);

  const [amount, setAmount] = useState(cookies.amount || 200);

  useEffect(() => {
    getAllRates();
  }, []);

  useEffect(() => {
    if (
      allRates && allRates.length !== 0
      && data && data.length !== 0
    ) {
      setLoading(false);
    }
  }, [allRates, data])

  useEffect(() => {
    if (allRates && allRates.length !== 0) {
      const chartData = allRates.map(({ date, rates }) => ({
        name: date,
        today: date !== JUNE_2017 || date !== MARCH_2015,
        [USD]: rates[USD],
        [GBP]: rates[GBP],
        [SGD]: rates[SGD],
      }));
      const sortedData = chartData.slice().sort((a, b) => new Date(a.name) - new Date(b.name));

      setData(sortedData);
    }
  }, [allRates])

  const getAllRates = async () => {
    const { rates, date, error } = await getRates();
    const { rates: marchRates, error: marchError } = await getRatesFromDate(MARCH_2015);
    const { rates: juneRates, error: juneError } = await getRatesFromDate(JUNE_2017);
    if (error || marchError || juneError) {
      setAllRates(cookies.rates);
    } else {
      const ratesData = [
        {
          date,
          rates,
          today: true,
        },
        {
          date: MARCH_2015,
          rates: marchRates,
        },
        {
          date: JUNE_2017,
          rates: juneRates,
        },
      ];
  
      setAllRates(ratesData);
      setCookies('rates', ratesData);
    }
  };

  const setAmountValue = (value) => {
    setCookies('amount', value);
    setAmount(value);
  }

  return (
    <div className="App">
      <>
        {loading ? (
          <>
            Loading...
          </>
        ) : (
          <>
            <div className="rates">
              <>
              {allRates.map(({ date, rates, today }) => {
                const base = today ? amount : 1; 
                return (
                  <div className="rate-year" key={date}>
                    {today ? (
                      <div className="input-wrapper">
                        <input
                          className="label"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmountValue(e.target.value)}
                        />
                        <span>SEK</span>
                      </div>
                    ) : (
                      <p className="label">1 SEK</p>
                    )}
                    <hr />
                    <p>USD: {(base * rates[USD]).toFixed(2)}</p>
                    <p>GBP: {(base * rates[GBP]).toFixed(2)}</p>
                    <p>SGD: {(base * rates[SGD]).toFixed(2)}</p>
                    <p className="date">{date}</p>
                  </div>
                );
                })}
              </>
            </div>
            {data && (
              <LineChart width={600} height={300} data={data} className="chart">
                <Line type="monotone" dataKey="USD" stroke="#8884d8" />
                <Line type="monotone" dataKey="SGD" stroke="#82ca9d" />
                <Line type="monotone" dataKey="GBP" stroke="#000000" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default App;