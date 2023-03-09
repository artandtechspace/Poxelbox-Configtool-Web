# Poxelbox

Was die Poxelbox ist und eine genaue Dokumentation des Systems findet man [hier](https://github.com/artandtechspace/Poxelbox-Dokumentation).


**Vorweg:**
Das Web-Config-Tool ist eine seperate Anwendung und nicht mit der Haupt-Software zusammenentwickelt.

Allerdings wird ein aktueller Build über Git-[Sub-Module](https://www.atlassian.com/git/tutorials/git-submodule) durch den Webserver der Haupt-Software mit ausgeliefert.

Mehr dazu in der 'Hosting des Web-Config-Tools'-Sektion im [Haupt-Software](https://github.com/artandtechspace/Poxelbox)-Repo

Das Exportieren und ausliefern des Builds an die Hauptsoftware wird aber hier in der 'Exportieren der Software'-Sektion erklärt

Da die Funktionsweise aller Poxelbox-Config tools recht ähnlich ist wird hier auch darauf nicht eingegangen und stattdessen auf die Erklärungen in der 'Konfiguration der Haupt-Software'-Sektion des  [Dokumentations-Repos](https://github.com/artandtechspace/Poxelbox-Dokumentation) verwiesen.

# Entwicklungsumgebung aufsetzen

Das Web-Config-Tool ist in [Vue.js](https://vuejs.org/) entwickelt und daher recht einfach als Entwicklungsumgebung aufzusetzen.

Hier wird empfehlen eine entsprechende IDE wie VSCode oder besser [VSCodium]() zu nehmen und dort die VueJs-Extension [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) zu nutzen.

Aber zum setup:

Nach dem Clonen des Repos per

```bash
git clone https://github.com/artandtechspace/Poxelbox-Configtool-Web
```

müssen alle NPM-Dependencies installiert werden:

```bash
npm install
```

Mit dem Befehl

```bash
npm run dev
```

kann nun der Entwicklermodus gestartet werden, in welchem automatisch Änderungen am Code [transpiliert](https://david-barreto.com/introduction-to-the-typescript-transpiler/) und in den Browser übertragen werden.

Diesen kann man nun über `o` öffnen lassen.

Wichtig ist allerdings noch, dass man im UI des Web-Config-Tools den `Advanced Mode` aktiviert und dort den Entpunkt auf eine Instanz der Poxelbox-Software zeigen lässt. Genaue infos dazu gibt es auch im [Dokumentations-Repo](https://github.com/artandtechspace/Poxelbox-Dokumentation).

# Exportieren der Software

Mit dem Befehl
```bash
npm run build-only
```

kann das Web-Config-Tool in reine WebAssets gebündelt werden.
Diese können nun über einen eigenen Server gehostet werden oder direkt über Git-[Sub-Module](https://www.atlassian.com/git/tutorials/git-submodule) durch den Webserver der [Haupt-Software](https://github.com/artandtechspace/Poxelbox) ausgeliefert werden.

Für zweiteres müssen die erstellen WebAsset-Dateien, welche im Ordner `dist/` gelandet sind, in den `build`-Branch des Web-Config-Tool-Repos geschoben werden.

Dazu einfach den Branch zu `build` wechseln:

```bash
git checkout build
```

und den `dist`-Ordner, welcher aufgrund der Exclusion durch die [.gitignore](https://www.atlassian.com/git/tutorials/saving-changes/gitignore)-Datei auch hier noch existieren sollte, in `app/` umbennen:


```bash
mv dist app
```

Die finale Struktur sollte dann etwa so oder so ähnlich aussehen:

```
└─ app
   ├─ assets/
   |   ├─ [...].png
   |   ├─ [...].svg
   |   ├─ [...].js
   |   └─ [...].css
   └─ index.html
```

Dieser build muss nun nur noch Committed und Gepushed werden:

```
git add .
git commit
git push
```

und im [Haupt-Software](https://github.com/artandtechspace/Poxelbox)-Repo über die Submodule eingebunden werden:

**Wichtig:** Dieser Befehl muss im **Haupt-Software-Repo** ausgeführt werden**

```bash
git submodule update
```
