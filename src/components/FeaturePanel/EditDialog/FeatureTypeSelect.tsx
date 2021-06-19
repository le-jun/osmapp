import React, { useEffect, useState } from 'react';
import { Box, MenuItem, TextField, Typography } from '@material-ui/core';
import Maki from '../../utils/Maki';
import { fetchJson } from '../../../services/fetch';
import { intl } from '../../../services/intl';
import { getPoiClass } from '../../../services/getPoiClass';
import { trimText } from '../../helpers';

/*
https://taginfo.openstreetmap.org/taginfo/apidoc#api_4_key_values
{
  "value": "parking",
  "count": 3897865,
  "fraction": 0.208,
  "in_wiki": true,
  "description": "Parkoviště pro auta",
  "desclang": "cs",
  "descdir": "ltr"
},
*/

const getData = async () => {
  const body = await fetchJson(
    `https://taginfo.openstreetmap.org/api/4/key/values?key=amenity&filter=all&lang=${intl.lang}&sortname=count_all&sortorder=desc&page=1&rp=100&qtype=value`, // &format=json_pretty
  );
  const key = 'amenity';
  return body.data
    .map((item) => ({
      ...item,
      key,
      tag: `${key}=${item.value}`,
      ...getPoiClass({ [key]: item.value }),
    }))
    .sort((a, b) => a.subclass.localeCompare(b.subclass));
};

const renderValue = (value) => (
  <>
    <Maki ico={value.class} size={16} middle /> {value.tag}
  </>
);

export const FeatureTypeSelect = ({ type, setType }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getData().then(setOptions);
  }, []);

  const onChange = (event) => setType(event.target.value);

  return (
    <Box mb={3}>
      <TextField
        variant="outlined"
        select
        fullWidth
        value={type}
        SelectProps={{ renderValue, onChange }}
        label="Zvolte typ objektu"
      >
        {options.map((item) => (
          <MenuItem key={item.tag} value={item}>
            <Box>
              <Maki ico={item.class} />
              {item.subclass}
              <br />
              <Typography variant="caption">
                {trimText(item.description, 100)}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};