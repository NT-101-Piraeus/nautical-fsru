import httpx
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime

# Λίστα προϊόντων προς παρακολούθηση
WATCHLIST = [
    {"name": "Marine Paint A", "url": "https://competitor-1.com/product1"},
    {"name": "Steel Shackles 10mm", "url": "https://competitor-2.com/shackles"},
]

def scrape_price(url):
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
    try:
        response = httpx.get(url, headers=headers, timeout=10.0)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Εδώ προσαρμόζεις το selector ανάλογα με το site του ανταγωνιστή
        # Παράδειγμα: <span class="price">150.00€</span>
        price_tag = soup.find("span", class_="price") or soup.find("div", id="current-price")
        
        if price_tag:
            return price_tag.text.strip().replace('€', '').replace(',', '.')
        return "N/A"
    except Exception as e:
        return f"Error: {str(e)}"

def generate_market_report():
    results = []
    print("🚀 Starting Market Intelligence Scan...")
    
    for item in WATCHLIST:
        price = scrape_price(item['url'])
        results.append({
            "Product": item['name'],
            "Competitor Price": price,
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
    
    df = pd.DataFrame(results)
    # Αποθήκευση σε CSV για το Dashboard ή αποστολή στη Supabase
    df.to_csv("market_report.csv", index=False)
    print("📊 Report Generated: market_report.csv")
    return results

if __name__ == "__main__":
    report = generate_market_report()
    # Εδώ μπορείς να προσθέσεις logic για αποστολή Telegram αν η τιμή πέσει κάτω από ένα όριο
