PAANO GAMITIN ANG PORTFOLIO MO
==============================

A. ANG LAMAN NG FOLDER
portfolio-site/
  index.html ............ ang istruktura ng page (huwag masyadong galawin)
  css/
    style.css ........... lahat ng kulay, font, layout, at animation
  js/
    data.js ............. DITO MO BABAGUHIN ANG MGA SALITA (pangalan ng project, certificate, experience, email, atbp.)
    main.js ............. ang mga animation at galaw ng page (huwag galawin)
    fallback-photo.js ... pampalit na larawan kapag wala pang images/profile.jpg (huwag galawin)
  images/
    profile.jpg ......... larawan mo (pwede ring profile.png na walang background)
    contact.jpg ......... opsyonal, larawan sa Contact
    welcome.jpg ......... opsyonal, background ng Welcome scene
    logos/ .............. mga logo ng school at opisina
    projects/ ........... mga larawan ng project
    certificates/ ....... mga larawan ng certificate
    gallery/ ............ mga larawan sa photo gallery
    awards/ ............. mga larawan ng award (opsyonal)
  cv/
    Quimada_Rejane_CV.pdf  ang CV mo (para sa View CV na button)
  pdf/ .................. mga PDF ng certificate (opsyonal)

B. SAAN ILALAGAY ANG MGA LARAWAN AT FILE
Dapat EKSAKTO ang pangalan ng file, kasama ang malalaki o maliliit na letra at ang .jpg o .png.
Kapag walang file, may placeholder na kulay na nakasulat na "Add your image here".

images/profile.jpg
images/profile.png .......... opsyonal, walang background. Kapag meron, ito na ang gagamitin at awtomatikong aalisin ang frame.
images/welcome.jpg .......... opsyonal, papalitan nito ang drawing ng bundok at constellation
images/logos/neust.png, bsnhs.png, civil-registry.png, senior-citizens.png, agriculture.png, rhu.png
images/projects/sierra.jpg, shoe-detector.jpg
images/certificates/certiport-html-css.jpg, database-101.jpg, jobready.jpg, ai-tools-101.jpg, crisis-management.jpg, civil-service.jpg
images/gallery/photo-1.jpg hanggang photo-12.jpg (hanggang 12 lang)
cv/Quimada_Rejane_CV.pdf

C. PAANO MAG-EDIT NG MGA SALITA
1. I-right-click ang js/data.js, piliin ang "Open with" tapos Notepad (o anumang text editor).
2. Makikita mo roon ang lahat ng laman: skills, education, experience, projects, certificates, gallery, at ang email at telepono mo.
   - Para magdagdag ng certificate: kopyahin ang isang linyang {title:'...',img:'...'}, ilagay sa ibaba nito, at palitan ang title at ang pangalan ng file.
   - Para magdagdag ng award: ilagay ito sa loob ng awards:[ ] sa parehong format. Lalabas ang Awards tab at folder.
   - Para baguhin ang Technical Skills: palitan ang mga nasa items:[ ] ng skills:[ ].
   - Para magdagdag ng GitHub o LinkedIn: ilagay sa links:[ ] ang {label:'GitHub',url:'https://...'}
3. I-save (Ctrl+S) at i-refresh ang page sa browser.

Para baguhin ang kulay: buksan ang css/style.css at hanapin ang --blue at --accl sa pinakataas (nasa :root).
Para baguhin ang font: palitan ang mga pangalan ng font sa index.html (sa Google Fonts link) at sa --fh sa css/style.css.

D. PAANO GAWING LARAWAN ANG CERTIFICATE NA PDF
1. Pinakamadali: pumunta sa ilovepdf.com/pdf_to_jpg, i-upload ang PDF, at i-download ang JPG. Palitan ang pangalan ng file ayon sa listahan sa B.
2. Sa Windows: buksan ang PDF sa Chrome o Edge, mag-screenshot gamit ang Win+Shift+S, at i-save bilang JPG.
   Sa Mac: buksan sa Preview, piliin ang File, Export, at JPEG.
   Sa phone: buksan ang PDF at mag-screenshot, tapos i-crop.
3. Kung gusto mong mabuksan din ng bisita ang mismong PDF: ilagay ang PDF sa folder na pdf/ at sa js/data.js, idagdag sa certificate ang pdf:'pdf/pangalan.pdf'. Lalabas ang "Open PDF" na button.
4. Pwede mo ring i-upload ang mga PDF at larawan sa chat kay Claude, at siya ang magko-convert at maglalagay ng mga ito.

E. PAANO ITO ILALAGAY ONLINE (LIBRE)
Pinakamadali: Netlify Drop
1. Pumunta sa https://app.netlify.com/drop (gumawa ng libreng account).
2. I-drag at i-drop ang BUONG folder na ito (yung may index.html sa loob).
3. Makakakuha ka agad ng link na pwede mong i-share. Pwede mong palitan ang pangalan nito sa Site settings.
Kapag may binago ka, i-drag ulit ang folder sa Deploys tab ng site mo.
Iba pang paraan: GitHub Pages o Vercel. Pareho rin silang libre.

F. MGA TIP
- Gumamit ng JPG at nasa 1200 pixels ang lapad. Para hindi mabigat ang page, mas mabuti kung hindi lalampas ng 500 KB ang bawat larawan.
- Para sa larawan mo, pinakamaganda ang malinaw, nakatayo mula bewang pataas, at may simpleng background.
- Gallery: kusang aayos ang layout ayon sa dami ng larawan na nakalista sa gallery:[ ] ng js/data.js (hanggang 12). Burahin ang mga linyang hindi mo kailangan. Kapag walang laman ang gallery:[ ], mawawala ang buong Gallery section.
  Awtomatikong aangkop ang bawat card sa hugis ng larawan (portrait o landscape). Kapag kinlik ang larawan, may pakaliwa at pakanan na arrow. Pwede ring gamitin ang arrow keys.
  Pwede kang magdagdag ng alt:'caption' sa data.js para magkaroon ng caption kapag na-click.
- Huwag buksan ang index.html sa pamamagitan ng pag-double-click kung hindi lumalabas ang mga font. Kailangan ng internet ang mga font. Lalabas ang mga ito kapag nasa Netlify na.

G. MGA CERTIFICATE NA NAKALAGAY NA
Na-convert na at nakalagay na ang mga ito sa images/certificates/ at pdf/:
- certiport-html-css (Certiport, HTML and CSS)
- ai-tools-101 (UpskillTechPH)
- database-101 (UpskillTechPH)
Nailagay na rin ang JobReady (jobready). Ang Crisis Management at Civil Service ay wala pang file. Ilagay ang mga ito sa images/certificates/ gamit ang mga pangalang nasa B.

H. GALLERY
Nakalagay na ang 12 larawan mo sa images/gallery/ (photo-1.jpg hanggang photo-12.jpg). Para magpalit ng larawan, palitan lang ang file na may parehong pangalan.

I. MGA PROJECT NA NAKALAGAY NA
- SIERRA: may larawan (images/projects/sierra.jpg) at link sa website. Lalabas ang "Visit site" na button.
- Obstacle Shoe Detector: wala pang larawan (images/projects/shoe-detector.jpg).
- Figma (laboratory activity): may larawan (images/projects/figma-lab.jpg).
Para magdagdag ng link sa project, ilagay ang link:'https://...' sa project sa js/data.js.
