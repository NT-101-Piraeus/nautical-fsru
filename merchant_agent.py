import httpx
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime
import os

# Λίστα Στόχων
WATCHLIST = [
    {"name": "Navaltech Color A", "url": "https://navaltech.gr/product/example-paint"}, # Αντικατάστησε με πραγματικά URLs
    {"name": "Navaltech Tools", "url": "https://navaltech.gr/product/example-tool"},
]

def scrape_navaltech_price(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        response = httpx.get(url, headers=headers, timeout=15.0)
        if response.status_code != 200:
            return f"Error {response.status_code}"
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Αναζήτηση τιμής: Συνήθως σε WooCommerce sites είναι στα παρακάτω tags
        # Δοκιμάζουμε διαδοχικά τα πιο κοινά selectors
        price_tag = (
            soup.select_one("span.woocommerce-Price-amount bdi") or 
            soup.select_one(".price .amount") or 
            soup.select_one(".current-price")
        )
        
        if price_tag:
            # Καθαρισμός κειμένου από σύμβολα ευρώ και κενά
            return price_tag.get_text().strip().replace('€', '').replace(',', '.')
        return "Price Not Found"
    except Exception as e:
        return f"Fail: {str(e)}"

def run_merchant_intelligence():
    results = []
    print(f"🚀 Έναρξη κατασκοπείας αγοράς: {datetime.now()}")
    
    for item in WATCHLIST:
        price = scrape_navaltech_price(item['url'])
        results.append({
            "Product": item['name'],
            "Price": price,
            "Source": "Navaltech",
            "Timestamp": datetime.now().strftime("%Y-%m-%d %H:%M")
        })
    
    # Δημιουργία Report
    df = pd.DataFrame(results)
    df.to_csv("merchant_report.csv", index=False)
    print("📊 Η αναφορά Merchant_Report.csv δημιουργήθηκε.")
    return results

if __name__ == "__main__":
    run_merchant_intelligence()
