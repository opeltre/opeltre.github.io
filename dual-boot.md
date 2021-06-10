---
layout:default
---

# Dual Boot Win10-Manjaro XPS

## Remarques générales 

Le contrôleur disque doit être passé en mode AHCI au lieu de IDE pour que l’installeur linux ait accès au disque dur. Ceci nécessite une reconfiguration de W10 et 2 redémarrages. 

La partition W10 est protégée et doit être réduite depuis windows, Gparted ne peut pas la redimensionner. L’espace libre restant pourra être partitionné depuis l’installeur Manjaro. 

Avant ces opérations il est préférable de faire un backup du système Windows. 

## Remarques sur le BIOS

Pour entrer dans le BIOS, glisser un doigt sur toutes les touches Fn pendant que Dell s’allume. 
Peut-être F12. Parfois on voit des disques bootables a gauche et double-cliquer dessus les démarre. 

Si Bitlocker est activé sur le disque et le Secure Boot désactivé, Windows demande une « Recovery key » pour monter le disque dur: on peut la récupérer en ligne avec ses identifiants Microsoft, ou réactiver le Secure Boot pour démarrer Windows. 

## Matériel nécessaire 

2 clés USB, une grosse et une petite. 

Sur la petite (2G+), copier l’installeur Manjaro Gnome [disponible ici](https://manjaro.org/downloads/official/gnome/). On peut vérifier la somme du fichier avec `sha1sum manjaro-x.iso` si on veut.

Depuis linux, on peut simplement créer le disque montable avec `cp`:


````
# lister les disques 
$ lsblk
# pour clé usb en /dev/sdb
$ sudo cp manjaro-x.iso /dev/sdb
````

Sur la grosse clé, il est préférable de faire un back up du système windows. Taper « Create Recovery Drive » après avoir appuyé sur la touche windows.

## Étapes d’installation
	
### 1.Redimensionner la partition Windows

Ouvrir le command prompt en tant qu’administrateur, taper `diskmgmt.msc`. 

Dans la fenêtre qui s’affiche, cliquer droit sur la plus grosse partition système (e.g. 1.8T) et la redimensionner à la taille voulue (e.g. 400G). 

### 2. Passer le disque en mode AHCI

Pour que Windows redémarre en AHCI, activer le safe boot. Depuis un admin command prompt,
```
> bcdedit /set {current} safeboot minimal
```
Redémarrer et entrer dans le BIOS. Taper AHCI dans la barre de recherche, et cocher l’option pour utiliser le contrôleur disque AHCI. Sauver les changements et quitter le BIOS. 

Redémarrer Windows. Désactiver le safe boot avec 
```
> bcdedit /deletevalue {current} safeboot
```

### 3. Démarrer l’installeur Manjaro

Entrer dans le BIOS, ou mieux le One-Time Boot Setup pour booter la clé. Parfois il faut désactiver le Secure Boot pour la voir apparaître, mais on pourra le réactiver après si on veut. Si elle n’est pas en raccourci à gauche, aller dans Boot Configuration pour la monter dans la liste.

Quand la clé USB démarre, choisir la configuration de clavier `fr` dans l'écran du bootloader.  

Depuis Manjaro, se connecter à internet en cliquant dans le coin en haut à droite. 

Lancer ensuite l'installeur et choisir les configurations claviers,
langues etc. Arrivé dans Partitions, on retrouve GParted.  

Choisir Table de Partition Manuelle.

### 4. Définir sa table de partitions

Cliquer sur l'espace disque libre laissé depuis Windows et ajouter 
ses partitions (GParted n'écrit rien tant que l'on a pas
validé vers l'étape suivante). Par exemple, avec 1.5TB d'espace libre: 

    - une partition ntfs de 1TB (optionnel): montable par windows et linux
    - une partition swap de 20GB (optionnel): parfois
      l'hibernation en a besoin pour stocker la ram.
      sauver la RAM
    - une partition ext4 montée en `/` de 50GB  pour le système Manjaro
    - une partition ext4 montée en `/home` de l'espace restant, 430GB,
      pour ses fichiers et programmes linux.

Cliquer sur la première partition FAT32 du disque. 
Choisir le mountpoint `/boot/efi` et cocher le flag `boot`. 
Windows l'utilise déjà pour booter en UEFI, Manjaro va simplement
y installer le bootloader grub.

En fait on peut faire ce qu'on veut tant qu'on laisse plus de 20GB pour
le système et une centaine de GB dans `/home` pour être tranquille.
On pourrait même n'avoir qu'une seule partition `/` en plus la petite 
première `/boot/efi` en fat32. 

Une fois que l'on est content de la table de partition, valider. 

### 5. Lancer l'installation 

Laisser l'installeur partitionner, formatter le disque puis installer 
Manjaro. 

On redémarre ensuite dans le grub
où l'on peut choisir entre manjaro et windows. 
