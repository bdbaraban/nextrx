import React from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';

const RecordsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            Lift
          </TableCell>
          <TableCell scope="col" border="bottom">
            1RM
          </TableCell>
          <TableCell scope="col" border="bottom">
            90%
          </TableCell>
          <TableCell scope="col" border="bottom">
            80%
          </TableCell>
          <TableCell scope="col" border="bottom">
            70%
          </TableCell>
          <TableCell scope="col" border="bottom">
            60%
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell scope="row">
            <strong>Power Clean</strong>
          </TableCell>
          <TableCell>255</TableCell>
          <TableCell>200</TableCell>
          <TableCell>190</TableCell>
          <TableCell>280</TableCell>
          <TableCell>188</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">
            <strong>Front Squat</strong>
          </TableCell>
          <TableCell>289</TableCell>
          <TableCell>249</TableCell>
          <TableCell>199</TableCell>
          <TableCell>189</TableCell>
          <TableCell>109</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">
            <strong>Back Squat</strong>
          </TableCell>
          <TableCell>204</TableCell>
          <TableCell>189</TableCell>
          <TableCell>139</TableCell>
          <TableCell>129</TableCell>
          <TableCell>119</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">
            <strong>Clean & Jerk</strong>
          </TableCell>
          <TableCell>204</TableCell>
          <TableCell>189</TableCell>
          <TableCell>139</TableCell>
          <TableCell>129</TableCell>
          <TableCell>119</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default RecordsTable;
