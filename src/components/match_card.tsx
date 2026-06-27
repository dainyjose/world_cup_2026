import { FlexAlignType, StyleSheet, View, Image, Text } from "react-native";
import { Match, Team } from "@/types/match";

export function MatchCard({ match }: { match: Match }) {
  const scoreLabel = match.hasScore
    ? `${match.score.home} - ${match.score.away}`
    : "0 - 0";

  const TeamRow = ({
    team,
    alignment,
  }: {
    team: Team;
    alignment: FlexAlignType | undefined;
  }) => {
    return (
      <View style={[styles.teamRow, { alignItems: "center" }]}>
        {team.flag ? (
          <Image
            source={{ uri: team.flag }}
            style={styles.flag}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.flag, styles.flagPlaceholder]} />
        )}
        <Text
          numberOfLines={1}
          style={styles.teamName}
        >
          {team.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.teams}>
        <TeamRow
          team={match.home}
          alignment="flex-start"
        />
        <View style={styles.meta}>
          <Text style={styles.score}>{scoreLabel}</Text>
          <Text style={styles.kickoffTime}>{match.kickoffTime}</Text>
          <Text style={styles.group}>Group {match.group}</Text>
        </View>
        <TeamRow
          team={match.away}
          alignment="flex-end"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#e4e4f3",
  },
  teams: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  teamRow: {
    gap: 8,
    justifyContent: "space-between",
    flex: 1 / 3,
  },
  flag: {
    width: 28,
    height: 20,
    borderRadius: 3,
    backgroundColor: "#0000001a",
  },
  flagPlaceholder: {
    opacity: 0.4,
  },
  teamName: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  meta: {
    alignItems: "center",
    gap: 2,
  },
  score: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  kickoffTime: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  group: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
});
