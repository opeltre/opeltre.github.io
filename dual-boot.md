---
layout: page
--- 

[swap]: https://wiki.archlinux.org/title/Partitioning#Swap

# Dual Boot Win10-Manjaro sur un Dell XPS

Liens utiles: 
- [AskUbuntu](https://askubuntu.com/questions/696413#answer-743329) passer le contrôleur disque en AHCI
- [Microsoft](https://answers.microsoft.com/en-us/windows/forum/windows_10-files-winpc/resize-windows-10-system-partition/914938c2-a0f7-4ad0-9730-230ac6fe38ba) redimensionner la partition système



## Matériel nécessaire 

2 clés USB, une grosse et une petite. 

Sur la petite (2G+), copier l’installeur de Manjaro Gnome [disponible ici](https://manjaro.org/downloads/official/gnome/) 
(il y aussi kde ou xfce, mais il gèrent plus mal les écrans high dpi). 
On peut vérifier la somme du fichier avec `sha1sum manjaro-x.iso` si on veut.

Depuis linux, on peut simplement créer le disque montable avec `cp`:


````
-- lister les disques:
$ lsblk

-- clé usb en /dev/sdX:
$ sudo cp manjaro-x.iso /dev/sdX
````

Sur la grosse clé, il est préférable de faire un back up du système windows. Taper « Create Recovery Drive » après avoir appuyé sur la touche windows.

## Remarques générales 

Le contrôleur disque doit être passé en mode AHCI pour que l’installeur linux ait accès au disque dur. Ceci demande une reconfiguration de W10 et 2 redémarrages, pour activer/désactiver le safe boot. 

La partition W10 est protégée et doit être redimensionnée depuis Windows car Gparted ne peut pas la rétrécir. L’espace libre restant pourra être partitionné depuis l’installeur Manjaro. 

Avant ces opérations il est préférable de créer un recovery drive depuis Windows et un backup de ses fichiers importants. 

## Remarques sur le BIOS

Pour entrer dans le BIOS, glisser un doigt sur toutes les touches Fn pendant que Dell s’allume. 
Peut-être F12. Parfois on voit des disques bootables a gauche et double-cliquer dessus les démarre. 

Si Bitlocker est activé sur le disque et le Secure Boot désactivé, Windows demande une « Recovery key » pour monter le disque dur: on peut la récupérer en ligne avec ses identifiants Microsoft, ou réactiver le Secure Boot pour démarrer Windows. 

## Étapes d’installation
	
### 1.Redimensionner la partition Windows

Ouvrir le command prompt en tant qu’administrateur, taper `diskmgmt.msc`. 

Dans la fenêtre qui s’affiche, cliquer droit sur la plus grosse partition système (e.g. 1.8T) et la redimensionner à la taille voulue (e.g. 400G). Windows a besoin de place mais l'on pourra faire une partition de fichiers commune aux deux OS. 

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

Entrer dans le BIOS, ou mieux le One-Time Boot Setup pour booter la clé. Parfois il faut désactiver le Secure Boot pour la voir apparaître, on pourra le réactiver après si on veut. Si elle n’est pas en raccourci à gauche, aller dans Boot Configuration pour la monter en haut de la liste.

Quand la clé USB démarre, choisir vite la configuration de clavier `fr` dans l'écran du bootloader (sinon, plus tard, windows > keyboard).

Depuis Manjaro, se connecter à internet en cliquant dans le coin en haut à droite. 

Lancer ensuite l'installeur et choisir les configurations claviers,
langues etc. Arrivé dans Partitions, on retrouve GParted. Choisir Table de Partition Manuelle.

### 4. Définir sa table de partitions

Cliquer sur l'espace disque libre laissé depuis Windows et ajouter 
ses partitions (GParted n'écrit rien tant que l'on a pas
validé vers l'étape suivante). Par exemple, avec 1.5TB d'espace libre: 

- une partition ntfs de 1TB (optionnel): montable par windows et linux
- une [partition swap][swap] de 20GB: l'hibernation en a besoin pour stocker la ram. 
- une partition ext4 montée en `/` de 50GB  pour le système Manjaro
- une partition ext4 montée en `/home` de l'espace restant, 430GB, pour ses fichiers et programmes linux.

N.B: On peut faire ce qu'on veut tant qu'on laisse plus de 20GB pour
le système et une centaine de GB dans `/home` pour être tranquille.
On pourrait même n'avoir qu'une seule grosse partition `/` en plus de la première petite 
`/boot/efi` en fat32. 

Sélectionner la première partition FAT32 du disque. 
Choisir le mountpoint `/boot/efi` et cocher le flag `boot`. 
Windows l'utilise déjà pour booter en UEFI, Manjaro va 
y installer le bootloader grub à côté.


Une fois que l'on est content de la table de partition, valider. 

### 5. Lancer l'installation 

Laisser l'installeur faire son travail, il  partitionne, formatte les disques puis installe Manjaro. 

On redémarre ensuite dans grub d'où Manjaro démarre par défaut au bout de quelques secondes. 

## &Agrave; propos de Manjaro

L'environnement de bureau gnome étant aussi utilisé par Ubuntu, il ne devrait pas y avoir beaucoup de dépaysement de ce point de vue là. 

La principale différence est que Manjaro est basée sur [Arch Linux](http://archlinux.org) dont elle garde le gestionnaire de paquet [pacman](https://wiki.archlinux.org/title/Pacman), mais l'accompagne d'un utilitaire pour installer des programmes ([AUR](https://aur.archlinux.org/) compris). Quelques exemples en ligne de commande:

```
-- Mettre à jour les bases de paquets
# pacman -Syy

-- Chercher dans la base
$ pacman -Ss texlive
-- Informations sur le paquet
$ pacman -Si texlive-core
-- Installer un paquet
# pacman -S texlive-core

-- Interroger la base de paquets installés
$ pacman -Q texlive

-- Supprimer un paquet et ses dépendances inutiles
# pacman -Rns texlive-publishers
```

Toutes les pages du [archwiki](https://wiki.archlinux.org) sont très bien écrites et documentées, par une communauté très technique. La plupart de ce qu'on y lit est applicable à Manjaro, et la qualité de la documentation fait une partie du plaisir d'utiliser cette distribution. 
