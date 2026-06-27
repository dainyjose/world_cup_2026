import {
  FlexAlignType,
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Match, MatchBucket, Team } from "@/types/match";
import { useState } from "react";

export function MatchCard({
  match,
  bucket,
}: {
  match: Match;
  bucket: MatchBucket;
}) {
  const [expanded, setExpanded] = useState(false);

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
          numberOfLines={2}
          style={styles.teamName}
        >
          {team.name}
        </Text>
      </View>
    );
  };

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.teams}>
        <TeamRow
          team={match.home}
          alignment="flex-start"
        />
        <View style={styles.meta}>
          <Text style={styles.score}>{scoreLabel}</Text>
          {bucket !== "today" && (
            <Text style={styles.date}>{match.kickoffDate}</Text>
          )}

          <Text style={styles.kickoffTime}>{match.kickoffTime}</Text>
          <Text style={styles.group}>Group {match.group}</Text>
          {expanded && (
            <View style={styles.localTimeContainer}>
              <Text style={styles.localTimeLabel}>🇮🇳 India Time</Text>
              <Text style={styles.localTime}>{match.indianKickoffTime}</Text>
            </View>
          )}
        </View>
        <TeamRow
          team={match.away}
          alignment="flex-end"
        />
      </View>
    </Pressable>
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
  date: {
    fontSize: 12,
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
  localTimeContainer: {
    marginTop: 8,
    alignItems: "center",
  },

  localTimeLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },

  localTime: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
  },
});
