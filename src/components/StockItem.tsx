import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontSizes, spacing, sizes } from "../utils/fontSizes";
import theme from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/stackNavigation/MainNavigation";
import { getCompanyImage } from "../utils/companyImage";

type StockItemNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface StockItemProps {
  stockData: any;
  onPress?: () => void;
}

const StockItem = ({ stockData, onPress }: StockItemProps) => {
  const navigation = useNavigation<StockItemNavigationProp>();

  const {
    id,
    name,
    ticker,
    logo_url,
    logo,
    price,
    current_price,
    change,
    price_change,
    changePercent,
    price_change_percent,
  } = stockData || {};

  const displayName = name || ticker || "";
  const shortName = ticker || "";
  const logoUrl: string | undefined = logo_url || logo;
  const imageSource = getCompanyImage(logoUrl);

  const currentPrice =
    typeof price === "number"
      ? price
      : typeof current_price === "number"
      ? current_price
      : null;

  const absChange =
    typeof change === "number"
      ? change
      : typeof price_change === "number"
      ? price_change
      : null;

  const pctChange =
    typeof changePercent === "number"
      ? changePercent
      : typeof price_change_percent === "number"
      ? price_change_percent
      : null;

  const isPositive =
    typeof absChange === "number"
      ? absChange >= 0
      : typeof pctChange === "number"
      ? pctChange >= 0
      : null;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.navigate("CompanyInfo", {
        stock: {
          id,
          name: displayName,
          ticker: shortName,
          logoUrl,
          price: currentPrice ?? undefined,
          change: absChange ?? undefined,
          changePercent: pctChange ?? undefined,
        },
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* <Image source={imageSource} style={styles.image} resizeMode="contain" /> */}
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.shortName}>{shortName}</Text>
        {currentPrice !== null && (
          <Text style={styles.price}>${currentPrice.toFixed(2)}</Text>
        )}
        {pctChange !== null && (
          <Text
            style={[
              styles.change,
              isPositive === null
                ? null
                : isPositive
                ? styles.changePositive
                : styles.changeNegative,
            ]}
          >
            {`${isPositive && pctChange > 0 ? "+" : ""}${pctChange.toFixed(
              2,
            )}%`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: spacing.xl,
    backgroundColor: "#fff",
    width: sizes.logoLarge + spacing.xxxl * 2,
    height: sizes.logoLarge + spacing.xxxl * 3,
    borderRadius: sizes.cardBorderRadius,
    padding: sizes.cardPadding,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  image: {
    width: sizes.logoMedium,
    height: sizes.logoMedium,
    backgroundColor: "red",
  },
  name: {
    fontSize: fontSizes.body,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "ZalandoSansExpanded-Italic",
  },
  shortName: {
    fontSize: fontSizes.caption,
    color: "gray",
    fontFamily: "ZalandoSansExpanded-Italic",
  },
  price: {
    marginTop: spacing.xs,
    fontSize: fontSizes.body,
    fontWeight: "bold",
    color: theme.text.primary,
    fontFamily: "ZalandoSansExpanded-Italic",
  },
  change: {
    marginTop: spacing.xs / 2,
    fontSize: fontSizes.caption,
    fontWeight: "bold",
    fontFamily: "ZalandoSansExpanded-Italic",
  },
  changePositive: {
    color: theme.status.success,
  },
  changeNegative: {
    color: theme.status.error,
  },
});

export default StockItem;