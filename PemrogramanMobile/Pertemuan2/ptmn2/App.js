import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

// Komponen tambahan untuk membuat bagian-bagian CV agar kode lebih rapi
const Section = ({ title, content }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionContent}>{content}</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Bagian Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Curriculum Vitae</Text>
        </View>

        {/* Kartu Profil / CV */}
        <View style={styles.card}>
          <Section 
            title="Nama Lengkap" 
            content="Dzaky Muhammad Nafis" 
          />
          <Section 
            title="NIM" 
            content="2488010048" 
          />
          <Section 
            title="Asal Sekolah" 
            content="SMKS Global Prima" 
          />
          <Section 
            title="Cita-cita" 
            content="Menjadi pribadi yang berdampak & berguna bagi banyak orang" 
          />
          <Section 
            title="Rencana Mencapai Cita-cita" 
            content="Menajamkan keahlian di bidang teknologi, aktif dalam kegiatan sosial, serta membangun solusi perangkat lunak yang dapat menyelesaikan masalah nyata di masyarakat." 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Tema dominan putih
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#007BFF', // Polesan biru di bagian bawah header
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007BFF', // Teks biru
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    // Efek bayangan dengan sentuhan biru muda
    shadowColor: '#007BFF', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8, // Untuk perangkat Android
    borderWidth: 1,
    borderColor: '#E6F0FA', // Biru sangat muda sebagai outline
  },
  sectionContainer: {
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007BFF', // Aksen garis biru di sebelah kiri setiap judul
    paddingLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007BFF', // Judul bagian berwarna biru
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 15,
    color: '#444444', // Abu-abu gelap agar kontras dengan putih tapi tidak terlalu pekat
    lineHeight: 24,
  },
});