(ns aoc-2021.day-09
  (:require [clojure.string :as str]))

(defn dedent [txt]
  (->> txt
    str/split-lines
    (map str/triml)
    (str/join "\n")))

(def example (dedent "2199943210
                      3987894921
                      9856789892
                      8767896789
                      9899965678"))

(def input (slurp "../2021-ts/data/day-09.txt"))

(defn read-height-map [input]
  (for [line (str/split-lines input)]
    (for [height (str/split line #"")]
      (read-string height))))

(defn range-2d [width height]
  (for [x (range 0 width) y (range 0 height)] [x y]))

(defn get-point [data x y]
  [(nth (nth data y [9]) x 9) [x y]])

(defn find-neighbours [floor x y]
  (vector
    (get-point floor x (dec y))
    (get-point floor x (inc y))
    (get-point floor (inc x) y)
    (get-point floor (dec x) y)))

(defn find-low-points [floor]
  (let [height (count floor)
        width  (count (first floor))]
    (for [[x y] (range-2d width height)
          :let [point      (first (get-point floor x y))
                neighbours (mapv first (find-neighbours floor x y))]
          :when (every? #(< point %) neighbours)]
      [point [x y]])))

(defn calculate-risk-level [floor]
  (reduce + (map #(inc (first %)) (find-low-points floor))))





(comment
  (calculate-risk-level (read-height-map example))
  (calculate-risk-level (read-height-map input))

  (do
    (defn trace-basin [floor value x y]
      {:value    value
       :x        x
       :y        y
       :children (mapv (fn [[new-value [new-x new-y]]] (trace-basin floor new-value new-x new-y))
                   (filter #(and (> 9 (first %)) (< value (first %)))
                     (find-neighbours floor x y)))})

    (let [raw    example
          floor  (read-height-map raw)
          basins (for [[value [x y]] (find-low-points floor)]
                   (trace-basin floor value x y))]
      basins
      #_(for [basin (first basins)]
        basin)
      #_(loop [node    (last basin)
               total   0
               visited []]
          (if (nil? node)
            [total visited]
            (recur (last node) (inc total) (conj visited node))
            ))))) )

