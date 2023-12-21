import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';



const Table = ({ tableHead, tableData }) => {

  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        {tableHead.map((header, index) => (
          <Text key={index} style={styles.columnHeader}>
            {header}
          </Text>
        ))}
      </View>
      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {rowData.map((cellData, columnIndex) => (
            <Text key={columnIndex} style={styles.tableCell}>
              {cellData}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    padding: 10,
    backgroundColor: COLORS.ACCENT_LIGHT,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    padding: 12,
    textAlign: 'center',
  },
});

export default Table;
