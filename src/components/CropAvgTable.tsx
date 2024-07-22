import { Table } from "@mantine/core";
import { aggregatedByCropDataType } from "../types/dataTypes";

export const CropAvgTable = ({ data, range }: { data: aggregatedByCropDataType, range: number }) => {
    //Convert Map to Array for itertion
    const values = Array.from(data);

    // Map aggregated data to table records
    const records = values.map((value) => {
        const crop = value[0];
        const averageYield = (value[1].totalYield / range).toFixed(3);
        const averageArea = (value[1].totalArea / range).toFixed(3);

        return (
            <Table.Tr key={crop}>
                <Table.Td>{crop}</Table.Td>
                <Table.Td>{averageYield}</Table.Td>
                <Table.Td>{averageArea}</Table.Td>
            </Table.Tr>
        );
    });

    return (
        <>
            <h2>Crop wise Average Yield and Cultivation Area</h2>
            <div className="table-container">
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Crop</Table.Th>
                            <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
                            <Table.Th>Average Cultivation Area of the Crop between 1950-2020</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{records}</Table.Tbody>
                </Table>
            </div>
        </>
    );
};